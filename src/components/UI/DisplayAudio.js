import React from "react";

const DisplayAudio = React.memo(({ audioBlob }) => {
  return <audio src={URL.createObjectURL(audioBlob)} controls />;
});

export default DisplayAudio;
