import "./App.css";
import React, { useState } from "react";
import { Header } from "./components/Header/Header";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

const App = () => {
  const [currentId, setCurrentId] = useState(null);

  return (
    <>
      <Header />
      <section className="section-gallery">
        <div className="container">
          <Posts currentId={currentId} setCurrentId={setCurrentId}></Posts>
          <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
        </div>
      </section>
    </>
  );
};

export default App;
