
package com.company.enroller.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    @Autowired
    private ParticipantProvider participantProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${security.secret}")
    private String secret;

    @Value("${security.issuer}")
    private String issuer;

    @Value("${security.tokenExpiration}")
    private int tokenExpiration;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers(HttpMethod.POST,"/api/tokens").permitAll()
                .antMatchers(HttpMethod.POST, "/api/participants").permitAll()
                .antMatchers("/api/**").authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), secret))
                .addFilterBefore(new JWTAuthenticationFilter(authenticationManager(), secret, issuer, tokenExpiration),
                        UsernamePasswordAuthenticationFilter.class);
    }
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(participantProvider).passwordEncoder(passwordEncoder);
    }
}
