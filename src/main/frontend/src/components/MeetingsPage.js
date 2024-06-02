import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({ username }) {
  const [meetings, setMeetings] = useState([]);
  const [addingNewMeeting, setAddingNewMeeting] = useState(false);
  const token = localStorage.getItem("token");

  const fetchMeetings = async () => {
    const response = await fetch("/api/meetings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const meetings = await response.json();
      setMeetings(meetings);
    }
  };

  async function handleNewMeeting(meeting) {
    const response = await fetch("/api/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(meeting),
    });
    if (response.ok) {
      const nextMeetings = [...meetings, meeting];
      setMeetings(nextMeetings);
      setAddingNewMeeting(false);
      fetchMeetings();
      toast.success("Pomyślnie dodano spotkanie!");
    } else {
      toast.error("Wystąpił błąd podczas tworzenia spotkania!");
    }
  }

  async function handleDeleteMeeting(meeting) {
    const response = await fetch(`/api/meetings/${meeting?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const nextMeetings = meetings.filter((m) => m !== meeting);
      setMeetings(nextMeetings);
      fetchMeetings();
      toast.success("Pomyślnie usunięto spotkanie!");
    } else {
      toast.error("Wystąpił błąd podczas usuwania spotkania!");
    }
  }

  async function handleSignIntoMeeting(meeting) {
    const login = username;

    const response = await fetch(`/api/meetings/${meeting.id}/participants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ login }),
    });
    if (response.ok) {
      fetchMeetings();
      toast.success("Pomyślnie zapisano!");
    } else {
      toast.error("Wystąpił błąd!");
    }
  }

  async function handleRemoveFromMeeting(meeting) {
    const response = await fetch(`/api/meetings/${meeting?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(meeting),
    });
    if (response.ok) {
      fetchMeetings();
      toast.success("Pomyślnie usunięto!");
    }
  }

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div>
      <h2>Zajęcia ({meetings?.length})</h2>
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
