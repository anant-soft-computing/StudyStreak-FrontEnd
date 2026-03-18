import React from "react";
import { Highlighter, SelectionProvider } from "react-selection-highlighter";

const DisplayLeftContainer = React.memo(({ passage, image }) => {
  return (
    <>
      {image && (
        <div className="text-center">
          <img
            className="mb-2"
            src={image}
            alt="Study Streak"
            height={250}
            width={250}
          />
        </div>
      )}
      <SelectionProvider>
        <Highlighter htmlString={passage} />
      </SelectionProvider>
    </>
  );
});

export default DisplayLeftContainer;
