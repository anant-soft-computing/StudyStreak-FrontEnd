import React, { useState } from "react";
import "../../css/index.css";

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
      <h3>Pasage Title</h3>
      <div>
        <p>
          Choose thr correct heading (i-ix) for paragraph <b>A</b>,<b>B</b>,
          <b>C</b> and <b>D</b> in the passage below
        </p>
        <ul>
          <li>i. Temperature on Earth</li>
          <li>ii. The Greenhouse</li>
          <li>iii. Creating Global Warming</li>
          <li>iv. Use of a Greenhouse</li>
          <li>v. Our Choice</li>
          <li>vi. Greenhouse Gases</li>
          <li>vii. Earth's Atmosphere</li>
          <li>viii. Reversing the Damage</li>
          <li>ix. Effects of Carban Diodide</li>
        </ul>
      </div>
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
  <p></p>Answer questions 1-6 which are based on the reading passage below.
  <h3>Incredible Journeys Reading Passage</h3>
  <div>
    <strong>A.</strong>
    <span>
      The nervous system of the desert ant Cataglyphis fortis, with around
      100,000 neurons, is about 1 millionth the size of a human brain. Yet,
      in the featureless deserts of Tunisia, this ant can venture over 100
      meters from its nest to find food without becoming lost. Imagine
      randomly wandering 20 kilometres in the open desert, your tracks
      obliterated by the wind, then turning around and making a beeline to
      your starting point - and no GPS allowed! That's the equivalent of
      what the desert ant accomplishes with its scant neural resources. How
      does it do it?
    </span>
  </div>
  <div>
    <strong>B</strong>
    <span>
      Jason, a graduate student studying the development of human and animal
      cognition, discusses a remarkable series of experiments on the desert
      ant on his blog, The Thoughtful Animal. In work spanning more than 30
      years, researchers from Rüdiger Wehner's laboratory at the University
      of Zurich Institute of Zoology carefully tracked the movements of ants
      in the desert as the insects foraged for food. One of the researchers'
      key questions was how the ants calculated the direction to their nest.
    </span>
  </div>
  <div>
    <strong>C</strong>
    <span>
      To check for the possibility that the ants used landmarks as visual
      cues, despite the relatively featureless desert landscape, the
      researchers engaged in a bit of trickery. They placed a food source at
      a distance from a nest, then tracked the nest's ants until the ants
      found the food. Once the food was found, the ants were relocated from
      that point so that the way back to their nest was a different
      direction than it would have been otherwise. The relocated ants walked
      away from the nest, in the same direction they should have walked if
      they had never been moved. This suggested that the ants are not
      following features, but orienting themselves relative to an internal
      navigation system or (as turned out to be the case) the position of
      the Sun in the sky.
    </span>
  </div>
  <div>
    <strong>D</strong>
    <span>
      No matter how convoluted a route the ants take to find the food, they
      always return in a straight-line path, heading directly home. The
      researchers discovered the ants navigation system isn't perfect, small
      errors arise depending on how circuitous their initial route was. But
      the ants account for these errors as well, by walking in a corrective
      zigzag pattern as they approach the nest. So how do the ants know how
      far to travel? It could still be that they are visually tracking the
      distance they walk. The researchers tested this by painting over the
      ants' eyes for their return trip, but the ants still walked the
      correct distance, indicating that the ants are not using sight to
      measure their journeys.
    </span>
  </div>
  <div>
    <strong>E</strong>
    <span>
      Another possibility is that the ants simply count their steps. In a
      remarkable experiment published in Science in 2006, scientists
      painstakingly attached 'stilts' made of pig hairs to some of the ants'
      legs, while other ants had their legs clipped, once they had reached
      their food target. If the ants counted their steps on the journey out,
      then the newly short-legged ants should stop short of the nest, while
      stilted ants should walk past it. Indeed, this is what occurred! Ants
      count their steps to track their location. (If only you had remembered
      to do this before you started on your 20-kilometre desert trek!)
    </span>
  </div>
  <div>
    <strong>F</strong>
    <span>
      But other creatures have different navigation puzzles to solve. In a
      separate post, Jason explains a study showing how maternal gerbils
      find their nests. When a baby is removed from the nest, the gerbil
      mother naturally tries to find and retrieve it. Researchers placed one
      of the babies in a cup at the centre of a platform, shrouded in
      darkness. When the mother found the baby, the platform was rotated.
      Did she head for the new position of her nest, with its scents and
      sounds of crying babies? No, she went straight to the spot where the
      nest had been, ignoring all these other cues. For gerbils, relying on
      the internal representation of their environment normally suffices, so
      the other information goes unheeded.
    </span>
  </div>
  <div>
    <strong>G</strong>
    <span>
      Migratory birds, on the other hand, must navigate over much larger
      distances, some of them returning to the identical geographic spot
      year after year. How do they manage this trick? One component,
      University of Auckland researcher and teacher Fabiana Kubke reports,
      is the ability to detect the Earth's magnetic field. Though we've
      known about this avian sixth sense for some time, the location of a
      bird's magnetic detector is still somewhat of a mystery. Last
      November, however, a team led by Manuela Zapka published a letter in
      Nature that narrowed the possibilities. Migratory European Robins have
      magnetic material in their beaks, but also molecules called
      cryptochromes in the back of their eyes that might be used as a sort
      of compass. The team systematically cut the connections between these
      two areas and the Robins' brains, finding that the ability to orient
      to compass points was only disturbed when the connection to
      cryptochromes was disrupted.
    </span>
  </div>
  <div>
    <strong>H</strong>
    <span>
      Much remains to be learned about how birds can successfully migrate
      over long distances. Unlike ants and gerbils, they can easily correct
      for large displacements in location and return to the correct spot.
    </span>
    <div>
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
      <p>
        Answer questions <b>1-7</b> which are based on the reading passage
        below.
      </p>
      <h2>A Secret Well Kept Reading Passage</h2>
      <p>
        Political leaders in the days before the internet and 24-hour cable news
        were not subjected to the intense media scrutiny that their modern
        counterparts face. It was possible to rise to power and stay in office
        despite having skeletons in the closet that would now see one disgraced
        in a scandal. One of the best examples of keeping damaging secrets from
        the public was Canadian Prime Minister, Lyon Mackenzie King, (almost
        always referred to as Mackenzie King).
      </p>
      <p>
        Mackenzie King was born in 1874 with the proverbial silver spoon. He
        accumulated five university degrees, including a PhD from Harvard in
        economics, a subject he went on to teach at that institute. In addition
        to being a professor and an economist, King was a lawyer and a
        journalist. He was also a civil servant and was appointed as Canada's
        first Minister of Labour. He was elected to Parliament as a Liberal and
        would go on to become Canada’s, and the Commonwealth's longest-serving
        prime minister, serving for nearly 22 years.
      </p>
      <p>
        Mackenzie King cut his political teeth as a labour negotiator. He was
        successful in part because he mastered the art of conciliation.
        Conciliation, along with half measures, would become his trademark. 'Do
        nothing by halves that can be done by quarters,” one detractor wrote of
        him. And so, King sought the middle ground in order to keep the
        country’s many factions together. He would go out of his way to avoid
        debate and was fond of saying 'Parliament will decide,' when pressed for
        an answer. He was pudgy, plodding, wooden and cold, and his speeches
        were slumber-inducing. Unloved, but practical and astute, he has been
        called Canada's greatest prime minister. He created old age pensions,
        unemployment insurance, and family allowance, and he left the country in
        much better shape than when he inherited it.
      </p>
      <p>
        Mackenzie King died in 1950, thus passing into the mildly-interesting
        annals of Canadian history. Then, during the seventies, his diaries (all
        30,000 pages of them) were published, and millions of Canadian jaws
        dropped. It turns out that King, that monotonous embodiment of
        Presbyterian morals, was a dedicated occultist who communicated with the
        dead, including his mother (who he revered), former President Roosevelt,
        Leonardo da Vinci, and his dogs. And he did this almost every evening
        for the last 25 years of his life.
      </p>
      <p>
        King used a Ouija board and owned a crystal ball. He read tea leaves. He
        employed mediums and consulted a psychic. He visited palmists. He was a
        numerologist, always sensitive to what the numbers 7 and 17 were
        attempting to reveal to him. He thought that when he looked at the clock
        and found both hands in alignment, someone from the other side must have
        been watching over him. King was careful not to reveal any of his
        'psychical research' to the public, his departed mother having warned
        him that people wouldn't understand.
      </p>
      <p>
        (Adapted from a passage in 'A Sort of Homecoming - In Search of Canada'
        by Troy Parfitt)
      </p>
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
      <h2>Multiple Choice Questions Practice Exercise</h2>
      <p>
        Answer questions <b>1-5</b> which are based on the reading passage
        below.
      </p>
      <h3>Travel is the best form of education Reading Passage</h3>
      <p>
        One learns a lot while serving in the United States Army. Foreing
        places, stressful conditions, and absence from home can foster an
        out-of-the-classroom education that crosses the boundary of the odd and
        unusual. Today, tales of strange sea creatures and haunted islands seem
        like a bad Sci-Fi marathon. But these were realities for one U.S. Army
        soldier stationed overseas at the thrun of the 20th century.
      </p>
      <p>
        The art of journal keeping, letter writing and daily diary entries are
        becoming extinct as methods of memory management are changing in today's
        technology driven world. What once was detailed on paper with memory
        fresh at hand is now posted on YouTube Today, blogs replace diary
        entries. Hand-written letters to loved ones are far slower than a quick
        Facebook 'poke' or a cell phone text message.
      </p>
      <p>
        Historians enjoy a deep appreciation for the written word. They savour
        the ability to see the world through the eyes of someone who never had
        satellite TV, the Internet or cell phone. Where explanation was not
        readily at hand in the strange lands of the Philippine Islands, the
        environment was ripe for adventure and the unknown. Placing one's self
        in such situations fosters an education that cannot be duplicated in any
        classroom, book or blockbuster movie. A survivor of deadly and savage
        situations, Colonel Horace P. Hoobs recorded these well-documented
        experiences that lend a degree of depth to the retelling and
        re-imagining of Army history.
      </p>
      <p>
        The odd education of Colonel Horace P. Hobbs is revealed in his
        voluminous personal papers held at the U.S. Army Military History
        Institute. A letter of August 16, 1918, soothes his wife while he is
        stationed in France during World War I. 'You see it is the women who
        suffer most during a war. Now I know you and mother are worrying about
        me and I am living in the most luxurious comfort and perfect safety just
        now.' He goes to great lengths to explain his lush surroundings and the
        comfort he is experiencing, from bathing in a nearby brook to the size
        of his room and the servants who provide for him, as he attempts to
        console a worry-sick wife. It would seem, however, that Mrs Hobbs had
        been through worse as a military spouse.
      </p>
      <p>
        Her husband was stationed in the Philippines during the insurrection
        from 1899 to 1901. Colonel Hobbs wrote a book from his collected
        journals and memoirs entitled, 'Kris and Krag: Adventures among the
        Moros of the Southern Philippine Islands'. Among his many tales, the
        Colonel tells about a strange native custom on one of the small islands
        of taking their boats across a narrow strait to another island and
        returning before dark. They explained to him that the island was the
        home of the 'wok-wok', a powerful ghost who must be appeased with gifts
        of rice so they will not harm the people. Upon further inspection, the
        Army discovered the 'wok-wok’ to be large apes.
      </p>
      <p>
        Another bizarre chapter in the Colonel's education came when he was
        asked by some villagers to kill a sea creature which wreaked havoc among
        the people whenever they Slaughtered an animal for food. The blood would
        run into the water, and out would come the creature. The Colonel waited
        for the apparition to appear after a slaughter, and he was not
        disappointed. Upon further inspection he described the animal as being
        some kind of mix between an alligator and a crocodile, but one he had
        never seen before.
      </p>
      <p>
        Experience in foreign places, blended with curiosity and a desire to
        learn, enabled Colon to obtain a far greater grasp of the world. These
        traits provided him with an education that the average person today
        cannot obtain from watching television or searching the web.
      </p>
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
      <h2>Evolution Of Museums Reading Passage</h2>
      <b>Part A</b>
      <p>
        The very first museums of the world were private collections of objects
        by wealthy people and institutions. The objects in these museums were
        displayed in Cabinets of Curiosities, also called Cabinets of Wonder or
        Wonder Rooms. The word “cabinet” was then used to describe a room and
        not a piece of furniture. The oldest recorded example of such was the
        Ennigaldi Nanna’s museum that was located in Mesopotamia. It was founded
        in 530 BC.
      </p>
      <p>
        Before the 18th century, only elite or respectable members of society,
        by the standards of that era, could visit museums with permission from
        the owner and the staff. The first museums to be opened for the general
        public were the British Museum in London in 1759 and the Uffizi Gallery
        in Florence in 1765. However, even though they were no longer exclusive
        places, only people from the middle and upper className were privileged
        with a written permission request. Also, the visitations were often
        limited to a few hours. The first public museum in its true sense was
        the Louvre in Paris which was opened in 1793 to people of any status and
        age, emerging as an agent of nationalistic fervor.
      </p>
      <p>
        In the late nineteenth and early twentieth centuries, societies began to
        regard museums as centers of the production of new knowledge. Historical
        museums shifted focus to display scientific discoveries and artistic
        developments with collections that could be useful for research also.
        Over the twentieth century, as cities increased in size, wealth, and
        population, more museums developed. These were shaped by the public
        response to education and entertainment. Greater funding was directed
        towards the development of modern museums. Study programs dedicated to
        the field of art and culture were created to promote the growth of
        museums, and activities such as the collection and preservation of
        artifacts such as paintings or sculptures had consequently become more
        organized. Even wealthy industrialists such as Henry Ford and Henry
        Mercer contributed their collections leading to the development of more
        privately run museums.
      </p>
      <b>Part B</b>
      <p>
        A breeze of change was once again felt in the early 21st century.
        Museums were no longer anchored to the national ideal and today’s new
        museums attract intellectuals as well as tourists and students.
        Attitudes toward museums have become more favorable as people no longer
        view them as boring, cold places that drag you to the past.
      </p>
      <p>
        One of the main factors that have contributed to this is technology.
        Modern museums have embraced technology with considerable use of
        multimedia, digital displays, touch screens as well as other interactive
        technologies. Some museums, such as the Metropolitan Museum of Art in
        New York, use technology that allows visitors to see the objects, hear
        or read about the collection on their smartphones by scanning the
        artwork. Other national museums have also followed suit by embracing
        mobile interactivity. The Smithsonian Institution, which is the world’s
        largest museum and research complex containing 19 museums and galleries,
        provides cell phone tours, interactive games like Pheon, which is a
        multimedia scavenger hunt game, multilingual slideshows, and even
        augmented reality apps such as one from the postal museum showing Owney,
        the mascot of the Railway Mail Service.
      </p>
      <p>
        Additionally, there are some museums such as the National Museum of
        African Art that have the Artists in Dialogue 2 app, which allows for
        visual calls and responses that cut across physical and political
        borders. The app facilitates a guided tour of the museum with the
        curator virtually, and also allows the user to experiment with the
        artistic technique in a virtual art-development game. The user can even
        communicate with active groups of the museum on social media.
      </p>
      <p>
        So far, technology has provided modern-day museums with the opportunity
        to share images and works of art with more people than ever before.
        However, the conclusion is that technology is enhancing and not
        replacing the brick and mortar museums since technology cannot replace a
        live experience for the viewer such as live interaction with the
        experts, emotional reactions, and the physicality of artworks.
      </p>
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
      <h3>
        <b>School Experiments Reading Passage</b>
      </h3>
      <p>
        It is essential when conducting this experiment to wear safety goggles.
        This experiment is divided into four distinct sections. The first, the
        reaction stage, is when a glass beaker is placed on top of a tripod, and
        20cm of dilute sulphuric acid poured into it. The acid is then heated.
        When it is almost boiling, a small quantity of copper oxide powder is
        added to the beaker. The mixture is then stirred with a glass spatula
        until the copper oxide has dissolved. This process is then repeated
        until 1g of powder has been added to the sulphuric acid. The heat is
        then removed from the beaker and the solution allowed to cool. The
        second stage is the filtration stage and, as the name suggests, is where
        a filter and conical flask are used to remove any copper oxide that has
        not reacted. A clear copper sulphate solution will be left in the glass
        dish. The third stage is where heat is applied to the copper sulphate
        solution in order to concentrate the solution: the concentration stage.
        The final crystallization stage happens when the solution begins to
        cool, and pure copper sulphate crystals start to form.
      </p>
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
      <p>Answer questions 1-5 which are based on the reading passage below.</p>
      <h3>
        <b>The Penny Black Reading Passage</b>
      </h3>
      <p>
        In 1840, the United Kingdom introduced the penny black, the first
        adhesive postage stamp issued anywhere in the world.For many years the
        postal service in the U.K. had been a very expensive service for
        ordinary people to use. The costs were prohibitive, a single letter
        sometimes costing a working person’s full day’s wage. The postal system
        also had many strange anomalies, such as certain categories of mail
        going free (and therefore being paid for by the charges on others),
        newspapers going for nothing, most mail being paid for by the addressee
        rather than by the sender, and so on.
      </p>
      <p>
        There were moves for postal reform for many years, until eventually
        these moves started gathering some force through the attention of many,
        amongst whom Rowland Hill is the best known, and Robert Wallace, MP for
        Greenock, was instrumental.
      </p>
      <p>
        The story is long and involved, but eventually, The Penny Postage Bill
        was passed by Parliament on 17 August 1839. Some basic elements of the
        plan were the lowering of postage rates for basic letters to one penny,
        the removal of certain idiosyncrasies, that prepayment would become
        normal, and the availability of printed envelopes, letter sheets, and
        labels to show prepayment. The “labels” were the penny black and
        twopence blue.
      </p>
      <p>
        A bookseller and printer from Dundee, James Chalmers, holds a strong
        claim to be the actual inventor of the adhesive postage stamp. He is
        said to have been interested in postal reform from about 1822, and to
        have printed samples of his idea for printed gummed labels in August
        1834. It seems that, although Hill also presented the idea of adhesive
        stamps, he was probably keener on the use of standard prepaid letter
        folders, such as were issued in 1840 using a design by William Mulready.
      </p>
      <p>
        The new stamps went on sale on 1st May 1840 and were valid for postage
        from 6th May 1840 (although some were used during the 1st-5th May
        period). The Mulreadies were issued at the same time. Public reaction to
        these new items was quite the opposite to Rowland Hill’s expectations.
        The labels were well-received and admired; the Mulready design was
        lambasted and ridiculed. Initial supplies of the stamps were rushed
        through the printing and distribution process, but supplies soon caught
        up with requirements.
      </p>
      <p>
        The stamps were printed in sheets of 240, engraved on steel plates, on
        gummed paper with a single small crown watermark on each stamp. Eleven
        different printing plates were used, and it is possible in almost every
        case to work out which plate any individual stamp was printed from by a
        few characteristics. Things like the positioning of the corner letters
        within their squares, the presence of the “O flaw”, which rays of the
        stars in the upper corners are broken at what points, and so on, can
        point to a correct plate identification, but more specialised literature
        is required in order to do this. Some plates are scarcer than others,
        plate 11 being the scarcest.
      </p>
      <p>
        Every penny black stamp has letters in the lower two corners. These
        simply identify what sheet position the stamp occupied. When the
        printing plates were produced the lower squares were blank, and the
        letters were punched in by hand. The left square letter shows which
        horizontal row the stamp was in – the first row being A, the second B,
        and so on down to the twentieth row with T. The right square letter
        indicates the vertical column, again with A for the first column, B, C,
        and so on across to L for the last (twelfth) column. It should be noted
        therefore that each letter combination is just as common or as scarce as
        any other.
      </p>
      <p>
        There were 68,158,080 penny blacks issued (yes, 68 million!), and even
        with only a 2% survival rate, there are likely to be about 1.3 million
        still in existence. The survival rate may well be considerably higher
        than 2%, as it should be remembered that in 1840 the use of envelopes
        was unusual, most letters being written, folded, and sealed with sealing
        wax; this meant that whenever a letter was filed in a lawyer’s office,
        bank, etc., the whole thing would be kept – letter and outer cover
        including the adhesive stamp.
      </p>
      <p>
        From the collector's perspective, the physical condition of the stamp –
        any fault such as a thin, tear, crease, or stain will lower the value,
        and the number, size, and regularity of the margins make a big
        difference to value. The stamps were not perforated and had to be
        separated using scissors or a knife. As there was only about 1mm between
        one stamp and another, it was very easy to stray just a little and cut
        into the printed design of the stamp. A stamp with two full margins and
        perhaps a couple of other part margins is about average. Collectors will
        pay higher prices for examples with four good, wide, and even margins.
      </p>
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
      <p>
        <i>
          Answer questions 1-7 which are based on the reading passage below.
        </i>
      </p>
      <h3>Objects From Different Civilizations Reading Passage</h3>
      <p>
        Objects from lost civilisations can tell us about the social
        relationships and the way of life of the people belonging to those
        societies. The Indus valley civilisation and the Chinese civilisation
        have been influential with their innovations and contributions to
        advanced technology. The Indus Valley civilization is also called the
        Harappan civilization. Developing along the mighty Indus River, it was
        at its peak around 2500 and 3500 BC. This Bronze Age civilisation is
        believed to be among the oldest world civilisations together with the
        Egyptian and Mesopotamian civilisations. The famous figurine of the
        dancing girl from the Harappa region shows the advances made in art and
        metallurgy at the time. The statue describes details such as the
        hairstyle and ornaments prevalent then such as the more than 20 bangles
        in her left arm and four on her right arm, and the necklace. Although
        the bronze statuette is in standing position, it was named the dancing
        girl by assuming that it was her profession.
      </p>
      <p>
        The seals are other famous objects from the Bronze Age. Seals are
        beautifully carved out of stone and then fired for durability. Over
        3,500 seals discovered are mostly square with different symbols at the
        top, an animal in the centre and a few more symbols at the bottom are,
        which are presumed to be the inscription of the Indus valley language.
        The inscription indicates that people of this age wrote the first line
        from right to left, the second line from left to right and so on. Some
        common animal inscriptions on these seals include elephants, unicorns,
        rhinoceros, and bulls. On the reverse face, most seals have projections
        with a hole to possibly carry it comfortably. The imprint on some of the
        seals suggests that they were used as clay tags for sacks of traded
        goods such as grain, which means that the Harappan people were involved
        in long-distance trading networks. Hunting tools show that the Indus
        people were fond of game. Many of the toys are carts and animals made
        from baked clay, and most were for children, which has led to the
        conclusion that the people had an active social life.
      </p>
      <p>
        Standardised measurement is another valuable contribution of the Indus
        valley people. The oldest ruler with markings was a copper alloy rod
        found by a German archaeologist and he claims that it was used as a
        standard measurement unit. He mentions that the measurements on the
        ruler are divided into units that correspond to 1.32 inches which are
        further divided into perfectly calculated decimal subdivisions.
        Measurements of the bricks found in excavations of the Mohenjo Daro and
        Harappan civilisations match with those on the ruler mentioned by the
        German archaeologist.
      </p>
      <p>
        China was the first nation to invent paper. In the older civilisations,
        words were written on natural materials such as grass stalks, earthen
        plates, wood and bamboo strips, tree leaves, and sheepskins. The first
        paper from the Chinese people was known as bo and was made of silk.
        However, it was expensive. In the 2nd century, a new kind of paper was
        produced from rags, bark, wheat stalks, and other materials, which was
        not only cheaper but was also durable and could be used for brush
        writing. Papermaking had spread to other parts of the world in the
        beginning of the third century. Ancient China also gets credit for the
        invention of gunpowder. In a collection of most important military
        techniques as described in Wujing Zongyao that was edited in 1044 by
        Zeng Gong Liang, three formulas of making gunpowder were discovered and
        have been described as the earliest formulas of such kinds. Another
        significant gift from China was the compass. It was developed after some
        miners got hold of a piece of a natural magnetite that attracted iron
        and pointed north. The compass that we use today is a result of a series
        of improvements to the earliest design. Before it was invented,
        navigators depended on the position of the moon, sun, and the polestar
        for their bearings.
      </p>
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
      <p>
        Answer <b>questions 1-5</b> which are based on the reading passage
        below.
      </p>
      <h3>The Halifax Explosion Reading Passage</h3>
      <p>
        Before the atomic bomb was dropped on Hiroshima in 1945, the
        largest-ever non-natural explosion had taken place in 1917 in the
        eastern Canadian port city of Halifax. With the outbreak of World War I,
        Halifax was effectively transformed into a boomtown. Convoys gathered
        weekly in Bedford Basin (the north-western end of Halifax Harbour) in
        order to traverse the Atlantic, and Halifax Harbour became heavy with
        vessels of one variety or another. This spike in boat traffic was not
        dealt with efficiently, and collisions became almost normal.
      </p>
      <p>
        On December 1st, 1917, the French vessel Mont Blanc left New York in
        order to join a convoy in Halifax after being loaded with 226,797
        kilograms of TNT (an explosive), 223,188 kilograms of benzol (a type of
        gasoline), 1,602,519 kilograms of wet picric acid (an explosive), and
        544,311 kilograms of dry picric acid (another explosive). On December
        6th, the Mont Blanc was ushered into Halifax’s harbour after the U-boat
        nets had been raised.
      </p>
      <p>
        At the same time, the cargoless Norwegian ship, Imo, left Bedford Basin
        en route to New York in order to pick up relief items for transport to
        war-torn Belgium. Imo was behind schedule and attempting to remedy that.
        She passed a boat on the wrong side before sending a tugboat retreating
        to port. By the time she reached the Narrows, she was in the wrong
        channel and going too fast. The Mont Blanc sounded her whistle, but the
        Imo sounded back twice, refusing to alter course. At the last moment,
        the Mont Blanc veered, and the Imo reversed, but it was too late. From
        the gash formed in the French boat’s hull seeped a noxious spiral of
        oily, orange-dappled smoke. Mont Blanc’s crew rowed to shore on the
        Dartmouth side, but no one could decipher their warnings. Their fiery
        vessel then casually drifted toward the Halifax side where it came to
        rest against one of the piers.
      </p>
      <p>
        This spectacle drew thousands of onlookers. People crowded docks and
        windows filled with curious faces. As many as 1,600 died instantly when
        the boat exploded. Around 9,000 were injured, 6,000 seriously so.
        Approximately 12,000 buildings were severely damaged; virtually every
        building in town was damaged to some extent; 1,630 were rendered
        nonexistent. Around 6,000 people were made homeless, and 25,000 people
        (half the population) were left without suitable housing.
      </p>
      <p>
        The Halifax Explosion, as it became known, was the largest manmade
        detonation to date, approximately one-fifth the ferocity of the bomb
        later dropped on Hiroshima. It sent up a column of smoke reckoned to be
        7,000 metres in height. It was felt more than 480 kilometres away. It
        flung a ship gun barrel some 5.5 kilometres, and part of an anchor,
        which weighed 517 kilograms, around 3 kilometres. The blast absolutely
        flattened a district known as Richmond. It also caused a tsunami that
        saw a wave 18 metres above the high-water mark depositing the Imo onto
        the shore of the Dartmouth side. The pressure wave of air that was
        produced snapped trees, bent iron rails, and grounded ships. That
        evening, a blizzard commenced, and it would continue until the next day,
        leaving 40 centimetres of snow in its wake. Consequently, many of those
        trapped within collapsed structures died of exposure. Historians put the
        death toll of the Halifax Explosion at approximately 2,000.
      </p>
      <p>
        Adapted from a passage in ‘A Sort of Homecoming – In Search of Canada’
        by Troy Parfitt
      </p>
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
      <p>Answer questions 1-8 which are based on the reading passage below.</p>
      <h3>
        <b>The Dingo - An Australian Pest Reading Passage</b>
      </h3>
      <p>
        The origins of the dingo are obscure, and there is much controversy
        connected with this. It is not truly native to Australia but is thought
        to have arrived between 3,500 and 4,000 years ago. Whatever its origins,
        the dingo was a highly valued companion to the aborigines. They were
        hunting companions, guard dogs, and they kept them warm at night.
      </p>
      <p>
        Some believe they were brought here on rafts or boats by the ancestral
        aborigines. It has also been suggested that they came with Indonesian or
        South-East Asian fishermen who visited the northern coast of Australia.
      </p>
      <p>
        The dingo can be found in all areas of Australia - from harsh deserts to
        lush rainforest The highly adaptable dingo is found in every habitat and
        every state of Australia,except Tasmania. In deserts, access to drinking
        water determines where the animal can live. Purebred dingo numbers in
        the wild are declining as man encroaches deeper and deeper into
        wilderness areas, often accompanied by his domestic dog.
      </p>
      <p>
        The dingo is different from the modern dog in several ways: it does not
        bark, it has a different gait, and its ears are always erect. Dingoes
        are naturally lean, and they are usually cream to reddish-yellow with
        white points, some are black with tan points. An adult dingo stands more
        than 60cm high and weighs about 15kg. It is slightly smaller than a
        German Shepherd.
      </p>
      <p>
        In its natural state, the dingo lives either alone or in a small group,
        unlike many other wild dog species which may form packs. Dingoes have a
        clearly defined territory which they rarely leave and which they protect
        from other dingoes, but which may be shared with dingoes when they form
        a group to hunt larger prey. The size of the home territory varies
        according to the food supply. Dingoes hunt mainly at night. Groups are
        controlled by dominant male. Members of a group maintain contact by
        marking rocks and trees within the territory, and by howling,
        particularly in the breeding season.
      </p>
      <p>
        The dingo's diet consists of native mammals, including kangaroos,
        although domestic animals and some farm stock are also on the menu. This
        makes the animal unpopular with farmers. The dingo is thought to have
        contributed to the mainland extinction of the thylacine through
        increased competition for food.
      </p>
      <p>
        The dingo is an intelligent animal. It is no more dangerous to man than
        any other feral dog. The natural prey of the dingo is small mammals and
        ground-dwelling birds, but with the introduction of white settlement,
        they became such a menace to sheep, calves and poultry that measures had
        to be taken in an attempt to control them, such as dog-proof fences.
      </p>
      <p>
        Dingoes start breeding when they reach the age of one or two but only
        the dominant members within an established group breed. They breed only
        once a year. Mating usually occurs in autumn/early winter, and after a
        gestation of nine weeks (same as domestic dogs), a litter averaging 4-5
        pups is born, which are reared in a hollow log, a rock-shelter, or an
        old rabbit warren. Both parents take part in raising the pups. The pups
        are fully grown at seven months of age. A dingo may live for up to ten
        years.
      </p>
      <p>
        Wild dingoes are wary of humans and do not attack unless provoked. They
        will approach camps in the bush looking for food or perhaps out of
        curiosity. Dingoes can be kept as pets but should be obtained at a very
        young age to enable them to bond with humans. Even when raised from pups
        they never seem to lose their instinct for killing poultry or small
        animals. Not all states in Australia allow dingoes to be kept as pets
        and a permit is required. The export of dingoes is illegal.
      </p>
      <p>
        Dingoes and domestic dogs interbreed freely resulting in very few
        pure-bred, southern or eastern Australia. This threatens the dingo's
        ability to survive as a separate species. Public hostility is another
        threat to the dingo. Because it takes some livestock, the dingo is
        considered by many to be a pest.
      </p>
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
      <p>
        Answer questions <b>1-8</b> which are based on the reading passage
        below.
      </p>
      <h3>
        <b>Doll Restoration Reading Passage</b>
      </h3>
      <p>
        This is a good example of how the average doll collector receives a
        doll. They will find a beautiful antique doll that does not look as
        beautiful as it should, but with proper restoration, she can be as
        beautiful as the day she was created. Here, there are two main problems,
        the eye mechanism has lost its original look, and it has a loose head.
        We removed the mohair wig and removed the eye system. Then we separated
        the head from the composition body and chemically cleaned the head,
        removing old dirt, and wax, but not harming the original artwork. We
        repaired the missing porcelain teeth by making duplicate porcelain teeth
        to match and reinserted them. Then we took the original eye system and
        reconditioned it. We then did the waxing of the eye mechanism and reset
        the eyebar so the eyebar would open and close as it originally did. What
        a wonderful difference to chemically clean and restyle the original
        mohair wig. Our seamstress took over point with suggestions from the
        owner on likes and dislikes using original period designs. She now
        looked, I'm sure, very much as she would have originally looked when the
        little child fell in love with her for the first time.
      </p>
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
      <p>
        Answer questions <b>1-8</b> which are based on the reading passage
        below.
      </p>
      <h3>
        <b>Economic Apartheid Reading Passage</b>
      </h3>
      <p>
        A new report from the World Institute for Development Economics Research
        of the United Nations University shows that wealth creation is
        remarkable, one might say, criminally, unequal. Follow this hierarchy at
        the top of the wealth pyramid: the richest 1 percent of adults alone
        owned 40 percent of global assets in the year 2000; the richest 2
        percent owned more than half of global household wealth, and the richest
        10 percent of adults accounted for 85% of the world total. That leaves
        very little for the remaining 90 percent of the global population. Could
        it be any worse? Yes, the rich are still getting richer, more
        millionaires are becoming billionaires.
      </p>
      <p>
        As to the world's lower className: the bottom half of the world's adult
        population owned barely 1 percent of global wealth, defined as net
        worth: the value of physical and financial assets fewer debts. Over a
        billion poor people subsist on less than one dollar a day. Every day,
        according to UNICEF, 30,000 children die due to poverty - that's over 10
        million children killed by poverty every year! Global economic apartheid
        is killing people.
      </p>
      <p>
        Here are data showing some of the variations among nations. Average
        wealth amounted to $144,000 per person in the U.S. in 2000, not as good
        as the $181,000 in Japan, but better than most others: $127,000 for the
        U.K., $70,000 for Denmark, $37,000 for New Zealand, $1,400 in Indonesia
        and $1,100 in India. Averages, of course, are very deceiving.
      </p>
      <p>
        The statistical measure of inequality is the Gini value, which measures
        inequality on a scale from zero (total equality) to one (complete
        inequality). For income, it ranges from .35 to .45 in most countries.
        Wealth inequality is usually much higher, typically between .65 and .75.
        This reflects the greater difficulty in accumulating wealth (capital)
        than increasing income. Two high wealth economies, Japan and the United
        States show very different patterns of wealth inequality, with Japan
        having a low wealth Gini of .55 and the U.S. having around .80. The
        incomes of the top fifth of the Japanese population are only three times
        that of the bottom fifth, compared to nine times in the U.S. Japan has
        little economic apartheid compared to the U.S., yet both countries have
        a huge number of wealthy people. Of the wealthiest 10 percent in the
        world, 25 percent are American, and 20 percent are Japanese. These two
        countries are even stronger among the richest 1 percent of individuals
        in the world, with 37 percent residing in the U.S. and 27 percent in
        Japan. The point is that despite high numbers of very wealthy people,
        economic apartheid is absent in Japan and abysmal in the U.S
      </p>
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
      <p>
        Answer questions <b>1-6</b> which are based on the reading passage
        below.
      </p>
      <h3>
        <b>Dependence On Technology Reading Passage</b>
      </h3>
      <p>
        Reaching the moon, multiplying two 12 digit numbers instantly, searching
        trillions of gigabytes of information at one go has all been made
        possible due to technology. It has realized possibilities that would
        have otherwise been considered a mammoth task to complete. Imagining a
        life without technological devices in the vicinity is an unpleasant
        thought for most people. But is the dependence desirable or does it have
        its downside too?
      </p>
      <p>
        In a survey conducted in the US, people were asked if society has become
        dependent on technology. Out of the total responses, 77% of people
        believed that dependence on technology has increased at an alarming
        rate. According to a study, 6% of school-going teenagers in China are
        addicted to the internet. In South Korea, the figures are likely to
        reach 10%. These results are not surprising. Today, if teenagers are
        asked the meaning of a particular word or to state their opinion on a
        given issue, they will instantly reach for their mobile and the internet
        instead of referring to a physical dictionary or a book for information.
        Turning pages of physical books are relatively time-consuming, but it
        does not necessarily mean that the much-trusted technology will always
        be able to deliver better.
      </p>
      <p>
        We have improved with technology, but we have not thought of an
        alternative if technology does not work. The most recent examples are
        the outages at the New York Stock Exchange when a break-down in the
        system took three-and-half hours to resolve and resume trading, halting
        the overall pace of Wall Street. Another such example is a minor router
        issue at United Airlines which grounded its planes for two hours leading
        to 800 flight delays. These are just a couple of the many incidents of a
        technical outage. While the technology in use may be state-of-the-art,
        having a reliable backup is equally important.
      </p>
      <p>
        Sophisticated systems in various areas such as airlines, military, or
        electric grids add to the convenience. However, there are inherent
        risks. For example, even upgraded security systems may be vulnerable to
        the slightest malfunction. A minor change in readings, codes, or chips
        with malicious intent may harm innocent people and society at large.
      </p>
      <p>
        Online networking, a gift of advanced technology, has become a part of
        our daily lives and its advantages are undeniable. However, it has
        changed our daily interactions and can change our social structure too.
        Face-to-face meetings have been replaced by chats and text messages on
        social media. Reduced face-to-face interaction has kept smartphone users
        away from real-life situations. The virtual world cannot replace
        real-life situations that demand communication skills, problem-solving
        skills, tolerance, and receptivity to coexist in society. 'They don't
        know how to handle conflict face to face because so many things happen
        through some sort of technology,' said Melissa Ortega, a child
        psychologist at New York's Child Mind Institute.
      </p>
      <p>
        Technology has improved our way of life, but it should be used only as a
        tool. Relying on it to an extent where a technological detox becomes
        next to impossible is worrying. We must be technologically advanced and
        not technology dependent.
      </p>
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
  <p>Answer questions
    <b>1-11</b>
    which are based on the reading passage below.
  </p>
  <h3>
    <b>Salinity Reading Passage </b>
  </h3>
  <p>It has long been recognized that our land uses, including agricultural development, have significantly changed
    Australia’s landscapes and natural systems. However, we have not always appreciated the magnitude of change in the
    soil, water, and nutrient balances, the resultant degradation, and the costs to the wider Australian community. The
    timeframe for these changes is to be slowed or reversed. Changes to the Australian landscape have resulted in the
    widespread and rapidly growing problem of dryland salinity. Farmers were among the first to be affected, by the
    salinization of rivers and agricultural land. Biodiversity, as well as regional and urban infrastructure, such as
    water supply, roads and buildings, are now also at risk. Two broad forms of salinity are recognized in Australia.
    Primary or naturally occurring salinity is part of the Australian landscape and reflects the development of this
    landscape over time. Examples are the marine plains found around the coastline of Australia and the salt lakes in
    central and Western Australia. Salts are distributed widely across Australian landscapes. They originate mainly from
    depositions of oceanic salt from rain and wind. Salt stored in the soil or groundwater is concentrated through
    evaporation and transpiration by plants. In a healthy catchment, salt is slowly leached downwards and stored below
    the root zone, or out of the system. Secondary salinity is the salinization of land and water resources due to land
    use impacts by people. It includes salinity that results from water table rises from irrigation systems — irrigation
    salinity, and from dryland management systems — dryland salinity. Both forms of salinity are due to accelerated
    rising water tables mobilizing salt in the soil. There is no fundamental difference in the hydrologic process. Where
    the water balance has been altered due to changing land use (e.g. clearing of native vegetation for broadacre
    farming or grazing), the excess water entering the water table mobilizes salt which then rises to the land surface.
    The movement of water drives salinization processes and may move the stored salt towards the soil surface or into
    surface water bodies.</p>
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

const DragDrop = () => {
  const [divContents, setDivContents] = useState(initialDivContents);
  const [selectedDivs, setSelectedDivs] = useState([]);

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
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "file.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="toolbar">
      <div className="wrapper">
        <div className="box-left">
          <div id="style1">
            <input type="file" id="imgInp" />
          </div>
          <div onClick={() => handleClick("header1")}>Left Paragraph</div>
          <div onClick={() => handleClick("header2")}>Matching Headings</div>
          <div onClick={() => handleClick("header3")}>Locating Information</div>
          <div onClick={() => handleClick("header4")}>True False Not Given</div>
          <div onClick={() => handleClick("header5")}>MCQ</div>
          <div onClick={() => handleClick("header6")}>Summary Completion</div>
          <div onClick={() => handleClick("header7")}>Diagram Labling</div>
          <div onClick={() => handleClick("header8")}>
            Matching Sentence Endings
          </div>
          <div onClick={() => handleClick("header9")}>Matching Features</div>
          <div onClick={() => handleClick("header10")}>Sentence Completion</div>
          <div onClick={() => handleClick("header11")}>Short Answer Que</div>
          <div onClick={() => handleClick("header12")}>
            Flow Chart Completion
          </div>
          <div onClick={() => handleClick("header13")}>Note Completion</div>
          <div onClick={() => handleClick("header14")}>Yes No Not Given</div>
          <div className="mb-4" onClick={() => handleClick("header15")}>
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
        <div className="box-right">
          {selectedDivs.map((header) => (
            <React.Fragment key={header}>
              <div
                className={
                  header === "header1" ? "header21Class" : "header2Class"
                }
                contentEditable
                dangerouslySetInnerHTML={{ __html: divContents[header] }}
                onBlur={(event) => handleContentChange(event, header)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
