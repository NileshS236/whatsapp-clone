import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import "../styles/Chat.css";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  SearchOutlined,
} from "@material-ui/icons";
import { useParams } from "react-router";
import db from "../firebase";
import firebase from "firebase";
import { useStateValue } from "../StateProvider";
import Picker, { SKIN_TONE_LIGHT } from "emoji-picker-react";

const Chat = () => {
  const [{ user }] = useStateValue();
  const [input, setInput] = useState({ value: [] });
  const [emoji, setEmoji] = useState([]);
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  console.log(input);

  const setEmojiVal = (e, emojiObject) => {
    setEmoji(emojiObject.emoji);
    setInput((prev) => ({ value: [...prev.value, emoji] }));
    document.getElementsByClassName("textMsg")[0].focus();
    e.preventDefault();
  };

  const displayEmojiBox = () => {
    document
      .getElementsByClassName("chat__emojis")[0]
      .classList.toggle("enabled");
  };

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data()?.name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user?.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__emojis">
        <Picker
          onEmojiClick={setEmojiVal}
          skinTone={SKIN_TONE_LIGHT}
          preload={true}
          disableSearchBar={true}
        />
      </div>

      <div className="chat__footer">
        <InsertEmoticon onClick={displayEmojiBox} />
        <form action="">
          <input
            value={input.value[input.value.length - 1]}
            onChange={(e) =>
              setInput((prev) => ({
                value: [...prev.value, e.target?.value],
              }))
            }
            type="text"
            placeholder="Type a message"
            className="textMsg"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
