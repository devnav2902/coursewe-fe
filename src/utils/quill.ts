class Quill {
  modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  formats = ["bold", "italic", "list", "bullet"];
}

const CustomQuill = new Quill();

export default CustomQuill;
