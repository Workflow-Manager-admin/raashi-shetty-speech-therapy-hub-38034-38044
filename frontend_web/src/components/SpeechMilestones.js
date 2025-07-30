import React from "react";
import "./SpeechMilestones.css";

/**
 * PUBLIC_INTERFACE
 * Speech and language milestone informational page for parents/guardians.
 * Provides age-grouped expectations and tips in an engaging, inviting style.
 */
export default function SpeechMilestones() {
  // Content: common milestones by age group
  const milestones = [
    {
      age: "0 - 12 months",
      items: [
        "Responds to sounds and turns head toward voices",
        "Babbles with increasing variety (e.g., ba-ba, da-da)",
        "Recognizes own name",
        "Understands basic 'no' or 'bye-bye'",
      ],
      tips: [
        "Talk, sing, and make eye contact often.",
        "Imitate your child's sounds and facial expressions.",
      ]
    },
    {
      age: "1 - 2 years",
      items: [
        "Uses simple words: mama, dada, ball, bye",
        "Points to objects/pictures when named",
        "Follows simple instructions (“come here”, “give me”)",
        "Combines two words: “more juice”, “mama up”",
      ],
      tips: [
        "Name everyday items and actions.",
        "Read and describe colorful picture books together.",
      ]
    },
    {
      age: "2 - 3 years",
      items: [
        "Vocabulary expands to ~50-200 words",
        "Uses 2-3 word sentences: “me want cookie”",
        "Strangers can understand about half of speech",
        "Asks simple questions (“What’s that?”)",
      ],
      tips: [
        "Encourage your child to help with stories: “What’s next?”",
        "Describe what you’re doing together out loud.",
      ]
    },
    {
      age: "3 - 4 years",
      items: [
        "Forms sentences of 4+ words",
        "Speaks and plays with other children",
        "Speech is clear to most people",
        "Talks about things that happened recently",
      ],
      tips: [
        "Let your child tell you about their day or a favorite story.",
        "Praise all attempts at communication!",
      ]
    },
    {
      age: "4 - 5 years",
      items: [
        "Tells longer stories, asks & answers many 'why' questions",
        "Can express feelings or describe actions in detail",
        "Speech mostly clear, some sounds (r, l, th) may still develop",
      ],
      tips: [
        "Play pretend and ask your child to invent stories.",
        "Model correct grammar without correcting harshly.",
      ]
    },
  ];

  return (
    <section className="milestones-section">
      <h2>Speech &amp; Language Milestones</h2>
      <p className="milestones-intro">
        Children develop communication skills at their own pace. 
        Here’s a guide to typical speech and language milestones by age.<br />
        <span style={{color:"#2447A5",fontWeight:600}}>If you notice significant delays, don't hesitate to reach out — early support matters!</span>
      </p>
      <div className="milestones-cards-wrap">
        {milestones.map((group, idx) => (
          <div className="milestone-card" key={idx}>
            <h3>{group.age}</h3>
            <ul>
              {group.items.map((item, n) => (
                <li key={n}>{item}</li>
              ))}
            </ul>
            <div className="milestone-tips">
              <b>Tips:</b>
              <ul>
                {group.tips.map((tip, t) => <li key={t}>{tip}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="milestones-help-cta">
        <p>
          <b>Concerned or need advice?</b> <br/>
          <a className="btn milestone-btn" href="/book">Book a Consultation</a> or <a className="btn milestone-btn" href="/ai-chat">Ask AI for Info</a>
        </p>
      </div>
    </section>
  );
}
