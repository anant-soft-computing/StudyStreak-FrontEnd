import React, { useState } from "react";
import TopBar from "../TopBar/TopBar";
import NavBar from "../NavBar/NavBar";
import { Tabs, Tab } from "react-bootstrap";
import DragDrop from "./DragDrop";

const ExamCreate = () => {
  const [key, setKey] = useState("acc");
  const ReadingTabs = () => {
    const [key, setKey] = useState("Section 1");
    return (
      <Tabs
        id="reading-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="section1" title="Section 1">
          <DragDrop />
        </Tab>
        <Tab eventKey="section2" title="Section 2">
          <DragDrop />
        </Tab>
        <Tab eventKey="section3" title="Section 3">
          <DragDrop />
        </Tab>
      </Tabs>
    );
  };

  const GeneralReadingTabs = () => {
    const [key, setKey] = useState("Section 1");
    return (
      <Tabs
        id="reading-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="section1" title="Section 1">
          <p>Section 1</p>
        </Tab>
        <Tab eventKey="section2" title="Section 2">
          <p>Section 2</p>
        </Tab>
        <Tab eventKey="section3" title="Section 3">
          <p>Section 3</p>
        </Tab>
      </Tabs>
    );
  };

  const IELTSACCTabs = () => {
    const [key, setKey] = useState("reading");

    return (
      <Tabs
        id="ielts-acc-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="reading" title="Reading">
          <ReadingTabs />
        </Tab>
        <Tab eventKey="listening" title="Listening">
          <p>Listening</p>
        </Tab>
        <Tab eventKey="speaking" title="Speaking">
          <p>Speaking</p>
        </Tab>
        <Tab eventKey="writing" title="Writing">
          <p>Writing</p>
        </Tab>
      </Tabs>
    );
  };

  const IELTSGeneralTabs = () => {
    const [key, setKey] = useState("reading");

    return (
      <Tabs
        id="ielts-acc-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="reading" title="Reading">
          <GeneralReadingTabs />
        </Tab>
        <Tab eventKey="listening" title="Listening">
          <p>Listening</p>
        </Tab>
        <Tab eventKey="speaking" title="Speaking">
          <p>Speaking</p>
        </Tab>
        <Tab eventKey="writing" title="Writing">
          <p>Writing</p>
        </Tab>
      </Tabs>
    );
  };
  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="mt-4">
            <Tabs
              id="ielts-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="acc" title="IELTS Academic">
                <IELTSACCTabs />
              </Tab>
              <Tab eventKey="general" title="IELTS General">
                <IELTSGeneralTabs />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamCreate;
