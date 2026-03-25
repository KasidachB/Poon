export type QuestionType = "radio" | "checkbox" | "scale" | "text" | "select";


/ Maybe change the title of the survey from "video games and political attitutde to "video games and attitudes about society" /

export interface SurveyQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: [string, string];
  required?: boolean;
}

export interface SurveySection {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: SurveyQuestion[];
}

export const surveySections: SurveySection[] = [
{
  id: "consent",
  title: "Research Information & Consent",
  description: `This survey is part of a master's thesis at Lund University. Participation is voluntary and all responses are anonymous. The survey explores video game engagement and attitudes about society among young adults in Sweden. Your responses will only be used for academic research purposes and cannot be linked to you as an individual.`,
  icon: "📄",
  questions: [
    {
      id: "c1",
      text: "Consent to participate",
      type: "checkbox",
      options: [
        "I confirm that I voluntarily consent to participate in this study and to the processing of my survey responses, including information related to political attitudes. The data will only be used for academic research purposes and will not be able to associate with you as an individual."
      ],
      required: true
    }
  ]
},

  {
    id: "gaming",
    title: "Video Game Engagement",
    description: "Tell us about your gaming habits and preferences.",
    icon: "🎮",
    questions: [
      {
        id: "g1",
        text: "How often do you play video games?",
        type: "radio",
        options: [
          "Every day",
          "Several times a week",
          "About once a week",
          "A few times a month",
          "Rarely",
          "Never",
        ],
        required: true,
      },
      {
        id: "g2",
        text: "On a typical gaming day, how many hours do you play?",
        type: "radio",
        options: [
          "Less than 1 hour",
          "1–2 hours",
          "3–4 hours",
          "5–6 hours",
          "More than 6 hours",
        ],
        required: true,
      },
      {
  id: "g3",
  text: "Which gaming platforms do you use most often? (Select all that apply)",
  type: "checkbox",
  options: [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "Mobile / Tablet",
    "Other",
  ],
  required: true,
},
      
      {
        id: "g4",
        text: "What genres do you play most often? (Select all that apply)",
        type: "checkbox",
        options: [
          "Action / Shooter (e.g., Call of Duty, Fortnite)",
          "Role-Playing Games (e.g., Elden Ring, Baldur's Gate 3)",
          "Strategy (e.g., Civilization, Age of Empires)",
          "Sports / Racing (e.g., FIFA, Gran Turismo)",
          "Sandbox / Survival (e.g., Minecraft, Valheim)",
          "Simulation (e.g., The Sims, Cities: Skylines)",
          "Puzzle / Casual",
          "Other",
        ],
        required: true,
      },
      {
        id: "g5",
        text: "How important is gaming as a social activity for you?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ["Not at all important", "Extremely important"],
        required: true,
      },
      {
        id: "g6",
        text: "Do you follow gaming news, streamers, or gaming communities online?",
        type: "radio",
        options: [
          "Yes, very actively",
          "Somewhat",
          "Rarely",
          "Not at all",
        ],
        required: true,
      },
      {
        id: "g7",
        text: "Have you ever encountered political or social themes in video games (e.g., war, governance, inequality)?",
        type: "radio",
        options: [
          "Yes, frequently",
          "Yes, sometimes",
          "Rarely",
          "Never",
          "Not sure",
        ],
        required: true,
      },
      {
        id: "g8",
        text: "To what extent have video games made you think about political or social issues?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ["Not at all", "To a great extent"],
        required: true,
      },
    ],
  },
  {
    id: "politics",
    title: "Social & Civic Attitudes",
    description: "Share your views on society, public issues, and civic engagement.",
    icon: "🏛️",
    questions: [
      {
        id: "p1",
        text: "How interested are you in politics?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ["Not at all interested", "Very interested"],
        required: true,
      },
      {
        id: "p2",
        text: "Did you vote in the most recent Swedish general election (2022)?",
        type: "radio",
        options: [
          "Yes",
          "No",
          "I was not eligible to vote",
          "Prefer not to say",
        ],
        required: true,
      },
      {
  id: "p3",
  text: "Which statement best reflects your view on freedom of speech in society?",
  type: "radio",
  options: [
    "Freedom of speech should be protected even for controversial or offensive opinions",
    "Freedom of speech should generally be protected, but some harmful or offensive opinions should be restricted",
    "Freedom of speech is important, but strong limits are needed to prevent harmful speech",
    "Freedom of speech should be restricted whenever speech may offend or destabilise society",
    "I don't know / Prefer not to say",
  ],
  required: true,
},
      {
        id: "p4",
        text: "How much trust do you have in the Swedish political system (Riksdag, government)?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ["No trust at all", "Complete trust"],
        required: true,
      },
      {
        id: "p5",
        text: "How do you primarily get information about social issues, public affairs, or current events? (Select all that apply)",
        type: "checkbox",  
        options: [
          "Traditional media (SVT, SR, newspapers)",
          "Social media (Instagram, TikTok, X/Twitter, Reddit)",
          "YouTube / podcasts",
          "Friends and family",
          "Gaming communities / Discord servers",
          "I don't follow political news",
        ],
        required: true,
      },
      {
        id: "p6",
        text: "Have you ever discussed social issues, public affairs, or current events in a gaming-related context (in-game chat, Discord, Twitch, etc.)?",
        type: "radio",
        options: [
          "Yes, often",
          "Yes, occasionally",
          "Rarely",
          "Never",
        ],
        required: true,
      },
      {
        id: "p7",
        text: "To what extent do you agree: \"Video games can influence people's views about society and public issues.\"",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ["Strongly disagree", "Strongly agree"],
        required: true,
      },
      {
  id: "p8",
  text: "Which of the following public issues is currently most important to you?",
  type: "radio",
  options: [
    "Climate & environment",
    "Immigration",
    "Economy & jobs",
    "Education",
    "Healthcare",
    "Digital rights & privacy",
  ],
  required: false,
},
      {
  id: "p9",      
  text: "Where would you place yourself on the political spectrum?",
  type: "radio", 
  options: [
    "Far left",
    "Left",
    "Centre-left",
    "Centre",
    "Centre-right",
    "Right",
    "Far right",
    "I don't know / Prefer not to say",
  ],
  required: true,
}
    ],
  },
  {
    id: "demographics",
    title: "About You",
    description: "A few background questions to help us understand our respondents.",
    icon: "👤",
    questions: [
      {
        id: "d1",
        text: "What is your age?",
        type: "radio",
        options: ["18–20", "21–24", "25–29", "30–35"],
        required: true,
      },
      {
        id: "d2",
        text: "What is your gender?",
        type: "radio",
        options: ["Man", "Woman", "Non-binary", "Prefer not to say", "Other"],
        required: true,
      },
      {
        id: "d3",
        text: "What is your current occupation?",
        type: "radio",
        options: [
          "Student",
          "Employed full-time",
          "Employed part-time",
          "Self-employed",
          "Unemployed",
          "Other",
        ],
        required: true,
      },
      {
        id: "d4",
        text: "What is your highest level of completed education?",
        type: "radio",
        options: [
          "Grundskola (primary/lower secondary)",
          "Gymnasium (upper secondary)",
          "Yrkeshögskola (vocational)",
          "Universitet/Högskola (university/college)",
          "Postgraduate (Master's, PhD)",
        ],
        required: true,
      },
      {
        id: "d5",
        text: "Where in Sweden do you live?",
        type: "select",
        options: [
  "Stockholm",
  "Gothenburg",
  "Malmö",
  "Lund",
  "Uppsala",
  "Linköping",
  "Umeå",
  "Helsingborg",
  "Other city in Sweden",
  "Small town / rural area",
],
        required: true,
      },
      {
        id: "d6",
        text: "Is there anything else you'd like to share about the relationship between gaming and politics?",
        type: "text",
        required: false,
      },
      
    ],
  },
];
