import React, { useState, useEffect } from "react";
import "./AddPost.css";
import "react-quill/dist/quill.snow.css";
import IngredientList from "./IngredientList";
import RecipeSteps from "./RecipeSteps";
import axios from "../../utils/Axios";

function AddPost({ calledFrom = "", id = null }) {
  const [loading, setloading] = useState(true);
  const [content, setContent] = useState({
    title: "",
    shortDesc: "",
    link: "",
  });
  const [Img, setImg] = useState(null);
  const [tags, setTags] = useState();
  const [steps, setSteps] = useState("");
  const [ingredients, setIngredients] = useState("");

  useEffect(() => {
    async function setStates(Data) {
      setContent({
        title: Data.title,
        shortDesc: Data.shortDesc,
        link: Data.link,
      });
      setTags(Data.tags);
      setSteps(Data.recipe);
      setIngredients(Data.ingredients);
    }
    async function getPost() {
      if (calledFrom === "edit") {
        const res = await axios.get(`/post/${id}`);
        const data = res.data;

        await setStates(data);
        setloading(false);
      } else setloading(false);
    }

    getPost();
  }, [calledFrom,id]);
  const handleIngredients = (val) => {
    setIngredients(val);
  };

  const handleSteps = (val) => {
    setSteps(val);
  };

  const handleContent = (e) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    e.preventDefault();
    setImg(e.target.files[0]);
  };

  const handleRequest = (e) => {
    e.preventDefault();

    if (calledFrom === "edit") {
      axios
        .patch(`/update/post/${id}`, {
          title: content.title,
          shortDesc: content.shortDesc,
          link: content.link,
          ingredients: ingredients,
          recipe: steps,
          tags: tags,
        })
        .then((res) => {
         setTimeout(() => {
           window.location = "/admin/home";
         }, 1000);
        })
        .catch((res) => {
          console.log(res.data);
        });
    } else {
      const d = new Date();
      const createdDate =
        d.getDay() + "-" + d.getMonth() + "-" + d.getFullYear();
      axios
        .post("/add_post", {
          title: content.title,
          shortDesc: content.shortDesc,
          link: content.link,
          ingredients: ingredients,
          recipe: steps,
          tags: tags,
          createdAt: createdDate,
        })
        .then((res) => {
          if (Img != null) {
            const fd = new FormData();
            fd.append("image", Img, Img.name);
            axios.post(`/upload_img/${res.data._id}`, fd).then((res) => {
              setTimeout(() => {
                window.location = "/admin/home";
              }, 1000);
            });
          }
          setTimeout(() => {
            window.location = "/admin/home";
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  };

  const handleTags = (e) => {
    e.preventDefault();
    const tag_name = e.target.name;
    if (tags) {
      if (!tags.includes(tag_name)) {
        setTags([...tags, tag_name]);
      }
    }
    else{
      setTags([ tag_name]);
    }
  };

  const Tags = () => {
    const tags_arr = [
      "Desi",
      "Traditional",
      "Westren",
      "Desert",
      "Baked",
      "Drinks",
    ];

    const tag_btn = tags_arr.map((t, index) => {
      return (
        <button
          type="button"
          key={index}
          className="tag_btn"
          name={t}
          onClick={handleTags}
        >
          {t}
        </button>
      );
    });

    return tag_btn;
  };

  const handleSelectedTags = (e) => {
    e.preventDefault();
    const arr = tags;
    const tag = e.target.name;
    const index = tags.indexOf(tag);
    arr.splice(index, 1);
    setTags([...arr]);
  };

  return (
    <>
      {loading ? (
        <div>The Data is Loading</div>
      ) : (
        <div className="addpost">
          <h1>Add New Post</h1>
          <form className="addpost_form">
            <div className="addpost_input_fields_container">
              <label className="label-head">Title</label>
              <div className="addpost_inputs">
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={content.title}
                  onChange={handleContent}
                  required
                />
              </div>
              <div className="image_selector">
                <input type="file" onChange={handleFile} accept="image/*" className="image-btn" />
                {/* <button type='button' onClick={handleImg} >Submit IMG</button> */}
              </div>
            </div>
            <div className="addpost_input_fields_container">
              <div>
                <label>Short Description</label>
                <div className="addpost_inputs">
                  <textarea
                    value={content.shortDesc}
                    onChange={handleContent}
                    type="text"
                    placeholder="Short Description"
                    name="shortDesc"
                    required
                  />
                </div>
              </div>
              <div>
                <label>Embed Link</label>
                <div className="addpost_inputs">
                  <input
                    type="text"
                    value={content.link}
                    onChange={handleContent}
                    placeholder="Embed Link"
                    name="link"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="tag_container">
              <div>
                <label class="tag-head">Available Tags</label>
                <div>
                  <Tags />
                </div>
              </div>
              <div>
                <label class="tag-head">Selected Tags</label>
                <div className="selected_tags_container">
                  {tags
                    ? tags.map((tag, index) => {
                        return (
                          <button
                            onClick={handleSelectedTags}
                            key={index}
                            name={tag}
                            type="button"
                            className="selected_tags"
                          >
                            {tag}
                          </button>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
            <div className="quill_container">
              <IngredientList
                ingredients={ingredients}
                handleIngredients={handleIngredients}
              />
              <RecipeSteps steps={steps} handleSteps={handleSteps} />
            </div>
            <button type="submit" onClick={handleRequest} class="submit-btn">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AddPost;
