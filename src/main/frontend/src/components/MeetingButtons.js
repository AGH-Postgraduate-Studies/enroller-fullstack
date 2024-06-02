export default function MeetingButtons({
  username,
  meeting,
  onDelete,
  onSignIntoMeeting,
  onRemoveFromMeeting,
}) {
  const isAttending = meeting?.participants?.some(
    (participant) => participant.login === username
  );
  const isEmpty = meeting?.participants?.length === 0;

  return (
    <>
      {isAttending ? (
        <button onClick={onRemoveFromMeeting}>Wypisz się</button>
      ) : (
        <button onClick={onSignIntoMeeting}>Zapisz się</button>
      )}
      {isEmpty && (
        <button onClick={onDelete} className="button-outline">
          Usuń puste spotkanie
        </button>
      )}
    </>
  );
}
