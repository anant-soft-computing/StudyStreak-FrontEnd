import React, { useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import { saveAs } from "file-saver";
import "../../css/index.css";
import TopBar from "../TopBar/TopBar";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import ajaxCall from "../../helpers/ajaxCall";

const initialDivContents = {
  header1: `
    <div className="header21Class">
      <h2>Matching Headings</h2>
      <h3>Passage Title</h3>
      <div>
        <p>
          Choose the correct heading (i-ix) for paragraphs <b>A</b>, <b>B</b>,
          <b>C</b>, and <b>D</b> in the passage below
        </p>
      </div>
    </div>
  `,
  header2: `
    <div className="header2Class">
      <h2>Matching Headings</h2>
      <div>
        <strong>A.</strong>
        <span>
          <select className="optionClass">
            <option value="i">i</option>
            <option value="ii">ii</option>
            <option value="iii">iii</option>
            <option value="v">v</option>
          </select>
          A greenhouse is a house made entirely of glass: both walls and roof
          are glass. One of the main purposes of a greenhouse is to grow
          tomatoes, flowers and other plants that might struggle to grow
          outside. A greenhouse stays warm inside, even during winter. Sunlight
          shines in and warms the plants and air inside. But the heat is trapped
          by the glass and cannot escape. So during the daylight hours, it gets
          warmer and warmer inside a greenhouse, and stays quite warm at night
          too.
        </span>
      </div>
      <div>
        <strong>B.</strong>
        <span>
          <select className="optionClass">
            <option value="i">i</option>
            <option value="ii">ii</option>
            <option value="iii">iii</option>
            <option value="v">v</option>
          </select>
          The Earth experiences a similar thing to a greenhouse. Gases in the
          atmosphere such as carbon dioxide do what the roof of a greenhouse
          does. During the day, the Sun shines through the atmosphere. Earth’s
          surface warms up in the sunlight. At night, Earth’s surface cools,
          releasing the heat back into the air. But some of the heat is trapped
          by the greenhouse gases in the atmosphere. That is what keeps our
          Earth a warm and comfortable 59 degrees Fahrenheit, on average.
        </span>
      </div>
      <div>
        <strong>C.</strong>
        <span>
          <select className="optionClass">
            <option value="i">i</option>
            <option value="ii">ii</option>
            <option value="iii">iii</option>
            <option value="v">v</option>
          </select>
          However, gas molecules, called greenhouse gases, that absorb thermal
          infrared radiation, and are in significant enough quantity, can force
          and alter the climate system. Carbon dioxide (CO)
        </span>
      </div>
      <div>
        <strong>D.</strong>
        <span>
          <select className="optionClass">
            <option value="i">i</option>
            <option value="ii">ii</option>
            <option value="iii">iii</option>
            <option value="v">v</option>
          </select>
          Many scientists agree that the damage to the Earth’s atmosphere and
          climate is past the point of no return or that the damage is near the
          point of no return. In Josef Werne’s opinion, an associate professor
          at the department of geology & planetary science at the University of
          Pittsburgh told Live Science, we have three options. Firstly to do
          nothing and live with the consequences. Secondly, to adapt to the
          changing climate (which includes things like rising sea level and
          related flooding). Thirdly, mitigate the impact of climate change by
          aggressively enacting policies that actually reduce the concentration
          of CO2 in the atmosphere.
        </span>
      </div>
      <button className="q-a">
        <b>Answers</b>
      </button>
    </div>
  `,
  header3: `
  <div className="header2Class">
  <h3>Locating Information Practice Exercise</h3>
      <h3>Questions 1- 6</h3>
      <p>
        This reading passage has eight paragraphs, <b>A–H.</b>
      </p>
      <p>Which paragraph contains the following information?</p>
      <p>
        Write the correct letter, <b>A - H</b>, as your answer to each
        question.
      </p>
      <ol>
        <li>
          <span>
            An explanation of how adjustments are made when navigating
            <select className="optionClass">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
            </select>
          </span>
        </li>
        <li>
          <span>
            Recent news about how navigation systems work
            <select className="optionClass">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
            </select>
          </span>
        </li>
        <li>
          <span>
            A comparison of tracking abilities
            <select className="optionClass">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
            </select>
          </span>
        </li>
        <li>
          <span>
            A study showing that scent and sound are not important
            <select className="optionClass">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
            </select>
          </span>
        </li>
        <li>
          <span>
            Explaining the importance of counting
            <select className="optionClass">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
            </select>
          </span>
        </li>
        <li>
          <span>
            A description of how ants navigate
            <select className="optionClass">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
            </select>
          </span>
        </li>
      </ol>
    </div>
  </div>
</div>
`,
  header4: `
    <div className="header2Class">
      <h1>True False Not Given Practice Exercise</h1>
      <h3>Questions 1-7</h3>
      <p>
        Do the following statements agree with the information given in the
        reading passage?
      </p>
      <p>Write</p>
      <ul>
        <li>
          <b>TRUE</b>
          <span> if the statement agrees with the information</span>
        </li>
        <li>
          <b>FALSE</b>
          <span> if the statement contradicts the information</span>
        </li>
        <li>
          <b>NOT GIVEN</b>
          <span> if there is no information on this in the passage</span>
        </li>
      </ul>
      <ol>
        <li>
          Mackenzie King came from a privileged background.
          <select className="optionClass">
            <option value="true">true</option>
            <option value="false">false</option>
            <option value="not given">Not Given</option>
          </select>
        </li>
        <li>
          He taught economics at Harvard University.
          <select className="optionClass">
            <option value="true">true</option>
            <option value="false">false</option>
            <option value="not given">Not Given</option>
          </select>
        </li>
        <li>
          Mackenzie King was known for his stubbornness and extreme political
          views..
          <select className="optionClass">
            <option value="true">true</option>
            <option value="false">false</option>
            <option value="not given">Not Given</option>
          </select>
        </li>
        <li>
          Mackenzie was not liked by his people and did nothing for their
          welfare.
          <select className="optionClass">
            <option value="true">true</option>
            <option value="false">false</option>
            <option value="not given">Not Given</option>
          </select>
        </li>
        <li>
          His diaries were published when he was in his seventies.
          <select className="optionClass">
            <option value="true">true</option>
            <option value="false">false</option>
            <option value="not given">Not Given</option>
          </select>
        </li>
        <li>
          He communicated with dead political leaders to get their advice on
          handling problems.
          <select className="optionClass">
            <option value="true">true</option>
            <option value="false">false</option>
            <option value="not given">Not Given</option>
          </select>
        </li>
        <li>
          He regarded seeing the hands of a clock together as an auspicious
          sign.
          <select className="optionClass">
            <option value="true">true</option>
            <option value="false">false</option>
            <option value="not given">Not Given</option>
          </select>
        </li>
      </ol>
    </div>`,
  header5: `
    <div className="header2Class">
    <h3>Questions 1-5</h3>
    <p>Choose the correct letter, a, b, c or d.</p>
    <ol>
      <li className="optionClass">
        What offers a non-traditional form of education?
        <ul>
          <li> a. Being away from home</li>
          <li>b. Being in foreign countries</li>
          <li>c. Situations that cause stress</li>
          <li>d. All of the above</li>
        </ul>
      </li>
      <li className="optionClass">
        Historians enjoy the chance to see
        <ul>
          <li>a. Satellite TV.</li>
          <li>b. The world through other's eyes.</li>
          <li>c. The world.</li>
          <li>d. Popular documented experiences.</li>
        </ul>
      </li>
      <li className="optionClass">
        While in France, the Colonel
        <ul>
          <li>a. Looked after his sick wife.</li>
          <li>b. Lived with his wife..</li>
          <li>
            c. Wrote letters to the U.S. Army Military History Institute,.
          </li>
          <li>d. Comforted his wife with his letters.</li>
        </ul>
      </li>
      <li className="optionClass">
        A sea creature would appear
        <ul>
          <li className="optionClass">
            a. Whenever the Colonel was in the village..
          </li>
          <li>b. And make the Colonel disappointed..</li>
          <li>c. When blood from a dead animal ran into the water..</li>
          <li>d. And slaughter an animal..</li>
        </ul>
      </li>
      <li>
        What traits helped a Colonel to get a good education?
        <ul>
          <li>a. A desire to travel to foreign places.</li>
          <li>b. Curiosity and a good grasp of the world.</li>
          <li>c. Watching TV and using the Internet .</li>
          <li>d. Curiosity and a desire to learn.</li>
        </ul>
      </li>
    </ol>
    </div>
  `,
  header6: `
    <div className="header2Class">
      <h2>Summary Completion</h2>
      <h4>Questions 1 - 5</h4>
      <p>Complete the summary below.</p>
      <p>
        Write <i>ONE WORD ONLY</i> from <b>Part A</b> of the passage for each
        answer.
      </p>
      <p>
        The earliest museums displayed personal 1
        <input className="optionClass" />
        belonging to rich people, and until the eighteenth century, only the
        elite className could visit these places. In the latter half of the
        century, the British Museum and the Uffizi Gallery opened their doors
        for the 2
        <input className="optionClass" />, but not without restrictions.
        Finally, in 1793, the Louvre in Paris allowed access irrespective of
        className and 3
        <input className="optionClass" /> and became a key factor in promoting
        nationalistic emotions.
      </p>
      <p>
        By the early twentieth century, museums had started gaining recognition
        as centers of knowledge. The 4 <input className="optionClass" /> had
        moved from history to art and science. During this century, with
        urbanization and more funds coming in, museums were modified to provide
        learning as well as 5
        <input className="optionClass" />.
      </p>
      <h4>Questions 6 - 9</h4>
      <p>
        Complete the summary based on <b>Part B</b> of the passage using the
        list of words, <b>A-G</b>, below.
      </p>
      <p>
        <b>Museums of 21st century</b>
      </p>
      <p>
        Modern museums have become 6<input className="optionClass" /> places to
        visit with the adoption of various interactive technologies. In the
        Metropolitan Museum of Art in New York, visitors can get 7
        <input className="optionClass" />
        about any artwork by scanning it through their smartphones. The National
        Museum of African Art provides the opportunity for a virtual 8
        <input className="optionClass" /> with the curator, artists, and social
        media groups through an app. Thus, the latest technology is 9
        <input className="optionClass" /> the existing museums by giving an
        enriched experience to the visitors.
      </p>
      <ul style={{ listStyleType: "none" }}>
        <li>A - dull</li>
        <li>B - communication</li>
        <li>C - information</li>
        <li>D - tour</li>
        <li>F - complementing</li>
        <li>G - replacing</li>
      </ul>
    </div>
  `,
  header7: `
    <div className="header2Class">
      <h2>Diagram Labelling Practice exercise</h2>
      <h4>Questions 1 – 6</h4>
      <p>
        The diagram below shows how copper sulphate can be made using simple
        laboratory equipment.
      </p>
      <p>
        Choose <b>NO MORE THAN THREE WORDS</b> from the reading passage for each
        answer.
      </p>
      <p>Label the diagram.</p>
      <h1>Paragraph</h1>
      <textarea id="editor" className="optionClass"></textarea>
    </div>`,
  header8: `
    <div className="header2Class">
      <h2>Matching Sentence Endings Practice Exercise</h2>
        <h4>Questions 1-5</h4>
      <p>Complete each sentence with the correct ending, A–G, below.</p>
      <p>
        <i>Write the correct letter, A-G, as your answer to each question. </i>
      </p>
      <ul style={{ listStyleType: "none" }}>
        <li>
          1 After reforms, most mails was
          <select className="optionClass">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
          </select>
        </li>
        <li>
          2 Each steel printing plate was
          <select className="optionClass">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
          </select>
        </li>
        <li>
          3 Every penny black was
          <select className="optionClass">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
          </select>
        </li>
        <li>
          4 Putting a letter in an envelope was
          <select className="optionClass">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
          </select>
        </li>
        <li>
          5 Keeping the borders of each stamp was
          <select className="optionClass">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
          </select>
        </li>
        <li>A Unusual in 1840.</li>
        <li>B Able to print sheets of 240 stamps.</li>
        <li>C Paid for by the sender.</li>
        <li>D Very difficult to achieve.</li>
        <li>E Very expensive to send.</li>
        <li>F Designed with two letters in the bottom corners.</li>
        <li>G Quickly accepted.</li>
      </ul>
    </div>`,
  header9: `
    <div className="header2Class">
      <h2>Matching features Practice Exercise</h2>
      <h4>Questions 1-7</h4>
      <p>
        <i>
          The reading passage mentions a number of objects/achievements related
          to Indus Valley and Chinese civilisations and their relevance.
        </i>
      </p>
      <p>
        <i>
          Match each object/ achievement (Questions 1-7) in List A with its
          relevance (A-J) in List B.
        </i>
      </p>
      <p>Write the correct letter, A-J, as your answer.</p>
      <p>
        <b>List A</b>
      </p>
      <ul>
        <li>
          1 figurine of the dancing girl
          <select className="optionClass">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
            <option value="h">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
          </select>
        </li>
        <li>
          2 seals for marking goods
          <select className="optionClass">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
            <option value="h">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
          </select>
        </li>
        <li>
          3 weapons for hunting
          <select className="optionClass">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
            <option value="h">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
          </select>
        </li>
        <li>
          4 toys for children
          <select className="optionClass">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
            <option value="h">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
          </select>
        </li>
        <li>
          5 copper alloy ruler
          <select className="optionClass">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
            <option value="h">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
          </select>
        </li>
        <li>
          6 production of paper from plant material
          <select className="optionClass">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
            <option value="h">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
          </select>
        </li>
        <li>
          7 invention of the compass
          <select className="optionClass">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
            <option value="h">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
          </select>
        </li>
      </ul>
      <p>
        <b>List B</b>
      </p>
      <ul>
        <li>A strength and affordability of a product</li>
        <li>B the various uses of clay</li>
        <li>C spread of commerce in a wide area</li>
        <li>D advancements in metal craft</li>
        <li>E recognition of dance as a profession</li>
        <li>F social activity</li>
        <li>G a consequence of the discovery of natural magnet</li>
        <li>H navigators depended on astronomical bodies</li>
        <li>I use of standard measurements in construction</li>
        <li>J the consumption of wild birds and animals as food</li>
      </ul>
    </div>
  `,
  header10: `
    <div className="header2Class">
      <h2>Sentence completion Practice Exercise</h2>
      <h4>Questions 1-5</h4>
      <p>
        Complete the sentences using <b>NO MORE THAN THREE WORDS</b> from the
        passage for each answer
      </p>
      <p>
        1. During World War One, Halifax Harbour was unable to handle the
        increased shipping traffic properly, and there were numerous
        <input type="text" className="optionClass" /> .
      </p>
      <p>
        2. The Imo was not in the correct
        <input type="text" className="optionClass" /> and travelling too fast.
      </p>
      <p>
        3. <input type="text" className="optionClass" /> of people were watching
        the burning ship when it exploded.
      </p>
      <p>
        4. The Halifax Explosion had about
        <input type="text" className="optionClass" /> of the power of the
        Hiroshima bomb.
      </p>
      <p>
        5. Freezing weather brought by a blizzard caused the death of some
        survivors who were <input type="text" className="optionClass" /> under
        collapsed buildings.
      </p>
    </div>
  `,
  header11: `
    <div className="header2Class">
      <h2>Short Answer question Practice Exercise</h2>
      <h3>Questions 1-8</h3>
      <p>Answer the questions below.</p>
      <p>
        Choose <b>NO MORE THAN THREE WORDS</b> from the passage for each answer.
      </p>
      <ul style={{ listStyleType: "none" }}>
        <li>
          1. What factor decides where the dingo can live in a desert
          <input className="optionClass" />
        </li>
        <li>
          2. Which physical characteristic distinguishes a dingo from a
          domesticated dog?
          <input className="optionClass" />
        </li>
        <li>
          3. What term refers to a group of wild dogs?
          <input className="optionClass" />
        </li>
        <li>
          4. What determines the vastness of the area occupied by the dingoes?
          Which landscape features are used by the group to remain connected?
          <input className="optionClass" />
        </li>
        <li>
          5. Which landscape features are used by the group to remain connected?
          <input className="optionClass" />
        </li>
        <li>
          6. What animal might have been wiped out due to the dingo?
          <input className="optionClass" />
        </li>
        <li>
          7. What has been made to protect the livestock from the dingoes?
          <input className="optionClass" />
        </li>
        <li>
          8. What do many people regard the dingo as?
          <input className="optionClass" />
        </li>
      </ul>
    </div>
  `,
  header12: `
    <div className="header2Class">
      <h2>Flow chart Completion Practice Exercise</h2>
      <h4>Questions 1 - 8</h4>
      <p>Complete the flow chart below</p>
      <p>
        Choose <b>NO MORE THAN THREE WORDS</b> for each answer
      </p>
      <div>
        <h1>Paragraph</h1>
        <textarea id="editor" className="optionClass"></textarea>
      </div>
    </div>
 `,
  header13: `
    <div>
      <h2>Note completion Practice exercise</h2>
      <h4>Questions 1 - 7</h4>
      <p>Complete the notes below.</p>
      <p>
        Write <b>NO MORE THAN TWO WORDS AND/ OR A NUMBER</b> from the passage
        for each answer.
      </p>
      <ul>
        <li>
          According to a UN report, the world’s wealth distribution is
          drastically 1
          <input className="optionClass" />
        </li>
        <li>
          In 2000, the wealthiest 1% had 40% of global wealth, while 10% owned 2
          <input className="optionClass" />
        </li>
        <li>
          In contrast, just 1% of riches was shared by the 3
          <input className="optionClass" /> .
        </li>
        <li>More than a billion people survive on less than a dollar daily</li>
        <li>
          Poverty causes the death of more than 4
          <input className="optionClass" /> children annually.
        </li>
      </ul>
      <p>Wealth imbalance among nations:</p>
      <ul>
        <li>
          In 2000, per capita wealth in Japan and America were $181,000 and $
          144,000 respectively, but a mere $1100 in India.
        </li>
        <li>
          Inequality is measured in terms of 5 <input className="optionClass" />
          , which ranges from 0 to 1.
        </li>
        <li>
          Japan has less 6 <input className="optionClass" /> than the U.S.
          though both have a large number of very rich people.
        </li>
        <li>
          Americans tend to save less, leading to less wealth accumulation.
        </li>
        <li>
          The U.S. example indicates that more 7
          <input className="optionClass" /> can result in serious social
          imbalance.
        </li>
      </ul>
    </div>
  `,
  header14: `
    <div className="header2Class">
      <h2>Yes/no/not given Practice exercise</h2>
      <h4>Questions 1 - 6</h4>
      <p>
        Do the following statements agree with the information given in the
        Reading Passage?
      </p>
      <span>Write</span>
      <p>
        <b>YES</b> if the statement agrees with the claims of the writer
      </p>
      <p>
        <b>NO</b> if the statement contradicts the claims of the writer
      </p>
      <p>
        <b>NOT GIVEN</b> if it is impossible to say what the writer thinks about
        this
      </p>
      <ol>
        <li>
          People do not like the idea of living without technology.
          <select className="optionClass">
            <option value="yes">yes</option>
            <option value="no">no</option>
            <option value="not given">not given</option>
          </select>
        </li>
        <li>
          Teenagers must prefer books over the internet for information.
          <select className="optionClass">
            <option value="yes">yes</option>
            <option value="no">no</option>
            <option value="not given">not given</option>
          </select>
        </li>
        <li>
          We are not yet prepared for technology failures.
          <select className="optionClass">
            <option value="yes">yes</option>
            <option value="no">no</option>
            <option value="not given">not given</option>
          </select>
        </li>
        <li>
          An alternative setup is always reliable.
          <select className="optionClass">
            <option value="yes">yes</option>
            <option value="no">no</option>
            <option value="not given">not given</option>
          </select>
        </li>
        <li>
          Improved systems have rare security breaches
          <select>
            <option value="yes">yes</option>
            <option value="no">no</option>
            <option value="not given">not given</option>
          </select>
        </li>
        <li>
          People are losing social skills due to virtual communication
          <select className="optionClass">
            <option value="yes">yes</option>
            <option value="no">no</option>
            <option value="not given">not given</option>
          </select>
        </li>
      </ol>
    </div>
 `,
  header15: `<div class='header2Class'>
  <h2>Table completion Practice exercise</h2>
  <h4>Questions 1 - 11</h4>
  <p>Complete the table below.
  </p> Choose
  <b>NO MORE THAN THREE WORDS</b>
  from the reading passage for each answer.
  </p>
  <style type='text/css'>
    .tg {
      border-collapse: collapse;
      border-spacing: 0;
    }

    .tg td {
      border-color: black;
      border-style: solid;
      border-width: 1px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      overflow: hidden;
      padding: 10px 5px;
      word-break: normal;
    }

    .tg th {
      border-color: black;
      border-style: solid;
      border-width: 1px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-weight: normal;
      overflow: hidden;
      padding: 10px 5px;
      word-break: normal;
    }

    .tg .tg-baqh {
      text-align: center;
      vertical-align: top
    }

    .tg .tg-0lax {
      text-align: left;
      vertical-align: top
    }
  </style>
  <table class='tg'>
    <thead>
      <tr>
        <th class='tg-baqh' colspan='2'>Two Forms Of Salinity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class='tg-baqh'>Primary</td>
        <td class='tg-baqh'>Secondary</td>
      </tr>
      <tr>
        <td class='tg-0lax'>Salinity Occurs in 1 </strong> <span> <select class='optionClass'>
              <option value='i'>i</option>
              <option value='ii'>ii</option>
              <option value='iii'>iii</option>
              <option value='v'>v</option>
            </select></td>
        <td class='tg-0lax'>salinity as a consequence of <br>7 </strong> <span> <select class='optionClass'>
              <option value='i'>i</option>
              <option value='ii'>ii</option>
              <option value='iii'>iii</option>
              <option value='v'>v</option>
            </select></td>
      </tr>
      <tr>
        <td class='tg-0lax'>oceanic salts are deposited by <br>2</strong> <span> <select class='optionClass'>
              <option value='i'>i</option>
              <option value='ii'>ii</option>
              <option value='iii'>iii</option>
              <option value='v'>v</option>
            </select>and <br>3</strong> <span> <select class='optionClass'>
                <option value='i'>i</option>
                <option value='ii'>ii</option>
                <option value='iii'>iii</option>
                <option value='v'>v</option>
              </select></td>
        <td class='tg-0lax'>it includes 8 </strong> <span> <select class='optionClass'>
              <option value='i'>i</option>
              <option value='ii'>ii</option>
              <option value='iii'>iii</option>
              <option value='v'>v</option>
            </select>salinity and <br>9 </strong> <span> <select class='optionClass'>
                <option value='i'>i</option>
                <option value='ii'>ii</option>
                <option value='iii'>iii</option>
                <option value='v'>v</option>
              </select>salinity</td>
      </tr>
      <tr>
        <td class='tg-0lax'>salt is a concetrated via<br>4</strong> <span> <select class='optionClass'>
              <option value='i'>i</option>
              <option value='ii'>ii</option>
              <option value='iii'>iii</option>
              <option value='v'>v</option>
            </select>and <br>5</strong> <span> <select class='optionClass'>
                <option value='i'>i</option>
                <option value='ii'>ii</option>
                <option value='iii'>iii</option>		
                <option value='v'>v</option>
              </select></td>
        <td class='tg-0lax' rowspan='2'>More water seeps&nbsp;&nbsp;into 10 </strong> <span> <select
              class='optionClass'>
              <option value='i'>i</option>
              <option value='ii'>ii</option>
              <option value='iii'>iii</option>
              <option value='v'>v</option>
            </select>as farms <br>replace local plants <br><br>causes salt to move to the 11</strong> <span> <select
                class='optionClass'>
                <option value='i'>i</option>
                <option value='ii'>ii</option>
                <option value='iii'>iii</option>
                <option value='v'>v</option>
              </select></td>
      </tr>
      <tr>
        <td class='tg-0lax'>salt moves downwards below <br>6</strong> <span> <select class='optionClass'>
              <option value='i'>i</option>
              <option value='ii'>ii</option>
              <option value='iii'>iii</option>
              <option value='v'>v</option>
            </select></td>
      </tr>
    </tbody>
  </table>
</div>`,
};

const initialQuestion = {
  question_number: "",
  answer_text: "",
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerQuestions = (state, action) => {
  if (action.type === "addQuestion") {
    return [...state, { ...initialQuestion }];
  }
  if (action.type === "updateQuestion") {
    const { index, field, value } = action.payload;
    const updatedQuestions = [...state];
    updatedQuestions[index][field] = value;
    return updatedQuestions;
  }
  return state;
};

const DragDrop = () => {
  const location = useLocation();
  const readingData = location.state?.readingData || {};
  const listeningData = location.state?.listeningData || {};

  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [divContents, setDivContents] = useState(initialDivContents);

  const [selectedDivs, setSelectedDivs] = useState([]);

  const [questions, dispatchQuestions] = useReducer(reducerQuestions, [
    initialQuestion,
  ]);

  const handleQuestionChange = (e, index, field) => {
    dispatchQuestions({
      type: "updateQuestion",
      payload: { index, field, value: e.target.value },
    });
  };

  const addMoreQuestions = () => {
    dispatchQuestions({ type: "addQuestion" });
  };

  const handleClick = (header) => {
    setSelectedDivs((prev) => [...prev, header]);
  };

  const handleContentChange = (event, header) => {
    event.preventDefault();
    setDivContents({
      ...divContents,
      [header]: event.target.innerHTML,
    });
  };

  const handleReset = () => {
    const shouldReset = window.confirm("Are you sure you want to reset?");
    if (shouldReset) {
      setSelectedDivs([]);
    }
  };

  const handleDelete = (header) => {
    setSelectedDivs((prev) => prev.filter((item) => item !== header));
  };

  const htmlContent = selectedDivs
    .map((header) => {
      return `<div class="${
        header === "header1" ? "header21Class" : "header2Class"
      }">${divContents[header]}</div>`;
    })
    .join("");

  const generateHTMLContent = () => {
    const htmlContent = selectedDivs
      .map((header) => {
        return `<div class="${
          header === "header1" ? "header21Class" : "header2Class"
        }">${divContents[header]}</div>`;
      })
      .join("");

    return `<div class="box-right">${htmlContent}</div>`;
  };

  const downloadHTMLFile = () => {
    const htmlContent = generateHTMLContent();
    const blob = new Blob([htmlContent], { type: "text/html" });
    saveAs(blob, "file.html");
  };

  const doReading = async (e) => {
    e.preventDefault();
    const data = {
      block_threshold: readingData.block_threshold,
      block_type: readingData.block_type,
      difficulty_level: readingData.difficulty_level,
      exam_name: readingData.exam_name,
      exam_type: readingData.exam_type,
      no_of_questions: readingData.no_of_questions,
      passage: readingData.passage,
      question: htmlContent,
      answers: questions,
    };
    try {
      const response = await ajaxCall("/exam-blocks/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        setFormStatus({
          isError: false,
          errMsg: "Successfully Created",
          isSubmitting: true,
        });
      } else if (response.status === 400) {
        setFormStatus({
          isError: true,
          errMsg: "Some Problem Occurred. Please try again.",
          isSubmitting: false,
        });
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    }
  };

  const doListening = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("block_threshold", listeningData.block_threshold);
    formData.append("block_type", listeningData.block_type);
    formData.append("difficulty_level", listeningData.difficulty_level);
    formData.append("exam_name", listeningData.exam_name);
    formData.append("exam_type", listeningData.exam_type);
    formData.append("no_of_questions", listeningData.no_of_questions);
    formData.append("passage", listeningData.passage);
    formData.append("question", htmlContent);
    formData.append(
      "answers",
      questions.forEach((answer, index) => {
        formData.append(
          `answers[${index}]question_number`,
          answer.question_number
        );
        formData.append(`answers[${index}]answer_text`, answer.answer_text);
      })
    );
    formData.append("audio_file", listeningData.audio_file);
    try {
      const response = await ajaxCall("/exam-blocks/", {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        setFormStatus({
          isError: false,
          errMsg: "Successfully Created",
          isSubmitting: true,
        });
      } else if (response.status === 400) {
        setFormStatus({
          isError: true,
          errMsg: "Some Problem Occurred. Please try again.",
          isSubmitting: false,
        });
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    }
  };

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="d-flex">
                <div>
                  <div className="box-left">
                    <div onClick={() => handleClick("header1")}>
                      Left Paragraph
                    </div>
                    <div onClick={() => handleClick("header2")}>
                      Matching Headings
                    </div>
                    <div onClick={() => handleClick("header3")}>
                      Locating Information
                    </div>
                    <div onClick={() => handleClick("header4")}>
                      True False Not Given
                    </div>
                    <div onClick={() => handleClick("header5")}>MCQ</div>
                    <div onClick={() => handleClick("header6")}>
                      Summary Completion
                    </div>
                    <div onClick={() => handleClick("header7")}>
                      Diagram Labling
                    </div>
                    <div onClick={() => handleClick("header8")}>
                      Matching Sentence Endings
                    </div>
                    <div onClick={() => handleClick("header9")}>
                      Matching Features
                    </div>
                    <div onClick={() => handleClick("header10")}>
                      Sentence Completion
                    </div>
                    <div onClick={() => handleClick("header11")}>
                      Short Answer Que
                    </div>
                    <div onClick={() => handleClick("header12")}>
                      Flow Chart Completion
                    </div>
                    <div onClick={() => handleClick("header13")}>
                      Note Completion
                    </div>
                    <div onClick={() => handleClick("header14")}>
                      Yes No Not Given
                    </div>
                    <div
                      className="mb-4"
                      onClick={() => handleClick("header15")}
                    >
                      Table Completion
                    </div>
                    <div className="d-flex mt-4">
                      <button
                        type="button"
                        className="btn danger reset"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        className="btn save"
                        onClick={downloadHTMLFile}
                      >
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="box-right">
                    {selectedDivs.map((header) => (
                      <div
                        key={header}
                        className={
                          header === "header1"
                            ? "header21Class"
                            : "header2Class"
                        }
                      >
                        <div className="d-flex justify-content-end">
                          <button onClick={() => handleDelete(header)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-close"
                            >
                              <path d="M18 6L6 18M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                        <div
                          contentEditable
                          dangerouslySetInnerHTML={{
                            __html: divContents[header],
                          }}
                          onBlur={(event) => handleContentChange(event, header)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12 col-12">
                  {questions.map((question, index) => (
                    <div className="row" key={index}>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                        <div className="dashboard__form__wraper">
                          <div className="dashboard__form__input">
                            <label>Question No.</label>
                            <input
                              type="number"
                              placeholder="Question No."
                              value={question.question_number}
                              onChange={(e) =>
                                handleQuestionChange(
                                  e,
                                  index,
                                  "question_number"
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-8 col-lg-6 col-md-6 col-12">
                        <div className="dashboard__form__wraper">
                          <div className="dashboard__form__input">
                            <label>Answer</label>
                            <input
                              type="text"
                              placeholder="Answer"
                              value={question.answer_text}
                              onChange={(e) =>
                                handleQuestionChange(e, index, "answer_text")
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {formStatus.isError ? (
                    <div className="text-danger mb-2">{formStatus.errMsg}</div>
                  ) : (
                    <div className="text-success mb-2">{formStatus.errMsg}</div>
                  )}
                  <button
                    className="default__button m-2"
                    onClick={addMoreQuestions}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-plus"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                  <button
                    className="default__button"
                    disabled={formStatus.isSubmitting}
                    onClick={
                      listeningData.exam_type === "Listening"
                        ? doListening
                        : doReading
                    }
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DragDrop;
