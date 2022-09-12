// Check if function already exists on the page
if (typeof ccEnquiryForm === "undefined" && typeof ccPatientFeedback === "undefined") {
  // Review section
  const ccPatientFeedback = () => {
    jQuery.get("https://www.spirehealthcare.com/patient-information/patient-feedback/").success((data) => addFeedback(data));
    // Add patient feedback section if successful
    let pageHTML;
    const addFeedback = (data) => {
      pageHTML = data;
    };
    // const
  };

  const ccEnquiryForm = () => {
    // VARIABLES ==========================================================
    const values = {
      container: document.querySelector(".site-container"),
      allElements: [],
      bothSteps: {
        title: "Make an enquiry",
        description:
          "If you need to get in touch with us, please complete the below form and someone from your local Spire team will get back to you",
        mandatory: "Fields marked with a <span>*</span> are mandatory and must be completed",
        enquiry: "Enquiry details",
        personal: "Personal details",
      },
      step1: {
        helpToday: "How can we help you today? <span>*</span>",
        funding: "How do you intend to fund your treatment? <span>*</span>",
        enquiry: "Your Enquiry",
        hospital: "Select a hospital <span>*</span>",
        enquire: "Tell us a little more about your enquiry <span>*</span>",
      },
      step2: {
        details: "Your details",
        title: "What is your title <span>*</span>",
        firstName: "What is your first name <span>*</span>",
        surName: "What is your surname <span>*</span>",
        birthDay: "What is your date of birth <span>*</span> [?]",
        postcode: "What is your postcode <span>*</span> [?]",
        email: "What is your email address <span>*</span>",
        phone: "What is your phone number <span>*</span>",
        weUse: "We use this to get in touch with you about your enquiry",
      },
    };

    // Store elements
    const labelElements = () => {
      const formSections = document.querySelectorAll("#enquiry-form > div > .grid > div, #enquiry-form > div > div");
      values.allElements = [];
      for (let i = 0; i < formSections.length; i++) {
        formSections[i].classList.add("cc-" + i);
        values.allElements.push(formSections[i]);
      }
    };

    // DOM FUNCTIONS ==========================================================
    // Section headers
    const addHeaders = () => {
      const header = [
        [values.step1.helpToday, values.step1.funding, values.step1.enquiry, values.step2.details],
        [values.allElements[1], values.allElements[2], values.allElements[4], values.allElements[6]],
      ];

      for (let i = 0; i < header[1].length; i++) {
        if (header[1][i] && !checkLength(".cc-sec-title" + i)) {
          const div = document.createElement("div");
          const title = document.createElement("h6");
          div.className = "cc-sec-title" + i;
          title.innerHTML = header[0][i];
          // Add mandatory paragraph
          if (i === 0 || i === 3) {
            const p = document.createElement("p");
            p.classList.add("cc-desc-mandatory");
            p.innerHTML = values.bothSteps.mandatory;
            div.appendChild(p);
          }

          div.appendChild(title);
          header[1][i].insertBefore(div, header[1][i].firstChild);

          if (header[1][i].querySelectorAll("#select-hospital").length < 1) {
            header[1][i].classList.add("cc-hide-label");
          }
        }
      }
    };

    // Dropdown to buttons
    const addListBtn = () => {
      const dropdowns = [values.allElements[1], values.allElements[2]]; // Dropdown sections

      for (const elem of dropdowns) {
        if (!checkLength(".cc-btn-wrap", elem)) {
          const options = elem.querySelectorAll("select option");
          const container = elem.querySelector(".enquiry-form__tabs__content__inner__container__element");
          const div = document.createElement("div");
          div.classList.add("cc-btn-wrap");

          const btnSelect = () => {
            container.querySelectorAll(".cc-active").forEach((button) => (button.className = ""));
            const val = container.querySelector("select").value;
            container.querySelector('button[data-value="' + val + '"').className = "cc-active";
          };

          // Create buttons based on options
          options.forEach((option) => {
            if (option.value !== "") {
              const button = document.createElement("button");
              button.type = "button";
              button.innerText = option.innerText;
              button.setAttribute("data-value", option.value);
              // If option already selected add active class
              if (container.querySelector("select").value === option.value) {
                button.className = "cc-active";
              }
              // Switch active class
              button.addEventListener("click", (e) => {
                container.querySelector("select").value = e.target.getAttribute("data-value");
                btnSelect();
              });

              div.appendChild(button);
            }
          });

          container.insertBefore(div, container.firstChild);
          elem.classList.add("cc-hide-select");
        }
      }
    };

    // Next / Back control button
    const addControlBtn = () => {
      if (!checkLength(".cc-step-btn")) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.classList.add("cc-step-btn");
        btn.innerText = btnText();

        btn.addEventListener("click", (e) => {
          switchSteps();
          btn.innerText = btnText();
        });

        values.allElements[12].insertBefore(btn, values.allElements[12].firstChild);
      }
    };

    // HELPER FUNCTIONS ==========================================================
    // Control Step 1 / 2
    const switchSteps = () => {
      if (values.container.classList.contains("cc-step-1")) {
        values.container.classList.add("cc-step-2");
        values.container.classList.remove("cc-step-1");
      } else if (values.container.classList.contains("cc-step-2")) {
        values.container.classList.add("cc-step-1");
        values.container.classList.remove("cc-step-2");
      }
    };

    // Button text update
    const btnText = () => (values.container.classList.contains("cc-step-1") ? "Next" : "Go Back");

    // Check if element exists in the DOM
    const checkLength = (elem, parent) => {
      if (parent) {
        return parent.querySelectorAll(elem).length > 0;
      } else {
        return document.querySelectorAll(elem).length > 0;
      }
    };

    // RUN FUNCTIONS ==========================================================
    labelElements();
    addControlBtn();
    addHeaders();
    addListBtn();

    console.log(values.allElements);
  };

  // Wait for element to load
  const clearEnquiryForm = setInterval(function () {
    if (document.querySelectorAll(".site-container #enquiry-form").length > 0 && jQuery) {
      clearInterval(clearEnquiryForm);
      ccPatientFeedback();
      // Check if site-container exists
      document.querySelector(".site-container").classList.add("cc-optimize");
      document.querySelector(".site-container").classList.add("cc-step-1");
      ccEnquiryForm();
    } else if (document.readyState === "complete") {
      clearInterval(clearEnquiryForm);
    }
  }, 100);
}

/* 
Step 1
    - How can we help you: dropdown to button selection
    - How do you intend to fund your treatment: dropdown to button selection
    - Tells us your enquiry: move below select hospital
    - Select hospital: move adobe tell us your enquiry
    - Add cta for next step
Step 2
    - tell us your title: on single row
    - what is your first name: on single row
    - what is your surname: on single row
    - Birthday: move up and on single row
    - Postcode: move up and on single row
    - Email address: on single line
    - Phone number: on single line
    - Shorten Marketing information
All 
    - Target only when on enquire pages
    - Patient feedback
    - styling on the header
    - Styling on the navigation

    */
