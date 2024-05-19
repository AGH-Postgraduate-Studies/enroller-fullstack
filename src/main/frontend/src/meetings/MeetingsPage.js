import { useEffect, useState } from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({ username }) {
  const [meetings, setMeetings] = useState([]);
  const [addingNewMeeting, setAddingNewMeeting] = useState(false);

  const fetchMeetings = async () => {
    const response = await fetch("/api/meetings");
    if (response.ok) {
      const meetings = await response.json();
      setMeetings(meetings);
    }
  };

  async function handleNewMeeting(meeting) {
    const response = await fetch("/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meeting),
    });
    if (response.ok) {
      const nextMeetings = [...meetings, meeting];
      setMeetings(nextMeetings);
      setAddingNewMeeting(false);
      fetchMeetings();
    }
  }

  async function handleDeleteMeeting(meeting) {
    const response = await fetch(`/api/meetings/${meeting.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const nextMeetings = meetings.filter((m) => m !== meeting);
      setMeetings(nextMeetings);
    }
  }

  async function handleSignIntoMeeting(meeting, username) {
    console.log(username);
    const response = await fetch(`/api/meetings/${meeting.id}/participants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: username,
      }),
    });
    if (response.ok) {
      console.log("ok");
    }
  }

  async function handleRemoveFromMeeting(meeting) {
    const response = await fetch(`/api/meetings/${meeting.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meeting),
    });
    if (response.ok) {
      console.log("ok");
    }
  }

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div>
      <h2>Zajęcia ({meetings.length})</h2>
      {addingNewMeeting ? (
        <NewMeetingForm onSubmit={(meeting) => handleNewMeeting(meeting)} />
      ) : (
        <button onClick={() => setAddingNewMeeting(true)}>
          Dodaj nowe spotkanie
        </button>
      )}
      {meetings.length > 0 && (
        <MeetingsList
          meetings={meetings}
          username={username}
          onDelete={handleDeleteMeeting}
          onSignIntoMeeting={handleSignIntoMeeting}
          onRemoveFromMeeting={handleRemoveFromMeeting}
        />
      )}
    </div>
  );
}
