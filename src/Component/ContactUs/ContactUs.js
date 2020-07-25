import React , {useState} from 'react'
import './ContactUs.css' 
import axios from '../../utils/Axios'
function ContactUs() {

    const [Contact, setContact] = useState({
        name:'',
        email:'',
        comment:''
    })

    const handleInput = (e) => {
      setContact({
        ...Contact,
        [e.target.name]: e.target.value,
      });
    };

    const handleContact =(e)=>{
        e.preventDefault()
        if(Contact.email !== '' && Contact.comment !== ''){
            axios.post("/contact", {
                email: Contact.email,
                comment: Contact.comment,
                subject: 'Contact'
            }).then(res=>{
                const snackbar = document.getElementsByClassName("snackbar")[0];
                snackbar.classList.add("snackbar_show");
                setTimeout(function () {
                  snackbar.classList.remove("snackbar_show");
                  
                }, 3000);
            });
        }
    }


    return (
      <div className="contact_us">
        <h1>Contact Us</h1>
        <p>
          Want to contact us? Feel free to fill the form below or you can also contact us through our social media pages. We will contact you accordingly. Thank You. 
        </p>
        <div className="contact_social_links">
          <a href="/">
            <span className="fab fa-facebook-square"></span>
          </a>

          <a href="/">
            <span className="fab fa-instagram"></span>
          </a>

          <a href="/">
            <span className="fab fa-youtube"></span>
          </a>
        </div>
        <h2>OR</h2>
        <form className="contact_form">
          <div className="contact_item">
            <input
              className="contact_input"
              value={Contact.name}
              type="text"
              name="name"
              onChange={handleInput}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="contact_item">
            <input
              className="contact_input"
              value={Contact.email}
              type="email"
              name="email"
              onChange={handleInput}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="contact_item">
            <textarea
              type="text"
              className="contact_input"
              name="comment"
              onChange={handleInput}
              value={Contact.comment}
              placeholder="Enter your comment"
              required
            />
          </div>
          <button
            className="contact_submit"
            type="submit"
            onClick={handleContact}
          >
            Submit
          </button>
        </form>
        <div className="snackbar">Form submited</div>
      </div>
    );
}

export default ContactUs
