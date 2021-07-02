const copyTextToClipboard = async (text: string | undefined) => {
  if (!text) {
    return false;
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    const successfulCopy = await document.execCommand("copy");
    document.body.removeChild(textArea);
    return successfulCopy;
  } catch (err) {
    return false;
  }
};

export default copyTextToClipboard;
