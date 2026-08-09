// Form field schema — mirrors the handoff's data/form-schema.json and extends
// it with volunteer and contact forms. Drives both HTML generation and the
// client-side validation logic in assets/js/main.js.

module.exports = {
  findHelp: {
    purpose: "Route residents and families to the right local support pathway.",
    endpointNote: "Connect to a CMS, CRM, secure form processor, or case management workflow before production use.",
    fields: [
      { name: "firstName", label: "First name", type: "text", required: true, autocomplete: "given-name" },
      { name: "lastName", label: "Last name", type: "text", required: true, autocomplete: "family-name" },
      { name: "email", label: "Email", type: "email", required: true, autocomplete: "email" },
      { name: "phone", label: "Phone", type: "tel", required: false, autocomplete: "tel" },
      { name: "metro", label: "Metro area", type: "select", required: true, optionsFrom: "metros" },
      { name: "impactCategory", label: "What kind of help are you looking for?", type: "select", required: true, optionsFrom: "impactCategories" },
      {
        name: "urgency",
        label: "How urgent is your need?",
        type: "select",
        required: true,
        options: ["Planning ahead", "Needed soon", "Urgent / crisis"],
      },
      {
        name: "preferredLanguage",
        label: "Preferred language",
        type: "select",
        required: false,
        options: ["English", "Español", "Other"],
      },
      { name: "message", label: "Tell us more about your situation", type: "textarea", required: false },
      {
        name: "consentToContact",
        label: "I consent to be contacted by H.O.O.D HOPE or a partner organization about my request.",
        type: "checkbox",
        required: true,
      },
    ],
  },
  partnerInquiry: {
    purpose: "Collect serious institutional, nonprofit, faith, civic, funder, volunteer, and research partner interest.",
    endpointNote: "Route by partner type and metro once a CRM or workflow tool is connected.",
    fields: [
      { name: "organizationName", label: "Organization name", type: "text", required: true },
      { name: "contactName", label: "Contact name", type: "text", required: true, autocomplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autocomplete: "email" },
      { name: "phone", label: "Phone", type: "tel", required: false, autocomplete: "tel" },
      {
        name: "partnerType",
        label: "Partner type",
        type: "select",
        required: true,
        options: [
          "Community Organization",
          "Healthcare Organization",
          "Foundation or Donor",
          "Employer",
          "Church or Faith Partner",
          "Government Agency",
          "Research Partner",
          "Other",
        ],
      },
      { name: "metroInterest", label: "Metro interest", type: "select", required: true, optionsFrom: "metrosWithMulti" },
      { name: "supportOffered", label: "What kind of partnership are you interested in?", type: "textarea", required: false },
      { name: "message", label: "Message", type: "textarea", required: false },
      {
        name: "consentToContact",
        label: "I consent to be contacted by H.O.O.D HOPE about this inquiry.",
        type: "checkbox",
        required: true,
      },
    ],
  },
  volunteer: {
    purpose: "Collect volunteer interest and match to metro-level opportunities.",
    endpointNote: "Connect to a volunteer management platform or CRM before production use.",
    fields: [
      { name: "firstName", label: "First name", type: "text", required: true, autocomplete: "given-name" },
      { name: "lastName", label: "Last name", type: "text", required: true, autocomplete: "family-name" },
      { name: "email", label: "Email", type: "email", required: true, autocomplete: "email" },
      { name: "phone", label: "Phone", type: "tel", required: false, autocomplete: "tel" },
      { name: "metro", label: "Metro area", type: "select", required: true, optionsFrom: "metros" },
      {
        name: "interestArea",
        label: "Area of interest",
        type: "select",
        required: false,
        optionsFrom: "impactCategories",
      },
      { name: "availability", label: "General availability", type: "text", required: false },
      { name: "message", label: "Anything else we should know?", type: "textarea", required: false },
      {
        name: "consentToContact",
        label: "I consent to be contacted by H.O.O.D HOPE about volunteer opportunities.",
        type: "checkbox",
        required: true,
      },
    ],
  },
  donation: {
    purpose: "Support fundraising while keeping the first site simple.",
    endpointNote: "Integrate Stripe, Donorbox, Givebutter, Every.org, or the client's preferred nonprofit donation platform.",
    fields: [
      { name: "amount", label: "Amount", type: "text", required: true },
      { name: "frequency", label: "Frequency", type: "select", required: true, options: ["One-time", "Monthly"] },
      { name: "donorName", label: "Name", type: "text", required: false },
      { name: "email", label: "Email", type: "email", required: true, autocomplete: "email" },
      {
        name: "designation",
        label: "Designation",
        type: "select",
        required: false,
        options: ["Where needed most", "Housing Stability", "Health & Wellness", "Food & Nutrition", "Education & Opportunity"],
      },
    ],
  },
  contact: {
    purpose: "General contact and routing to the right team.",
    endpointNote: "Route submissions to the appropriate inbox or CRM queue.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, autocomplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autocomplete: "email" },
      {
        name: "reason",
        label: "Reason for contact",
        type: "select",
        required: true,
        options: ["General question", "Media inquiry", "Partnership", "Donor relations", "Other"],
      },
      { name: "message", label: "Message", type: "textarea", required: true },
    ],
  },
};
