# Adapt-ER · UIST 2026

9-minute script · 13 slides · planned duration 540 seconds.


## 01. Adapt-ER: Democratizing Extensive Reading by Tailoring Web Content

**0:00–0:25 · 25 seconds**

Hello, this is Hyeon. Today, I will present Adapt-ER: Democratizing Extensive Reading by Tailoring Web Content. I wish I were there in Detroit with you. I had planned to attend in person, but a faculty job interview that I could not reschedule means I am presenting remotely. Thank you for having me anyway. Let me begin with something that has followed me throughout my research life: learning English.

*Source: Paper p. 1; presenter context. Paper title and authors; personal opening in notes.*


## 02. Learning English Was Almost a Second Job.

**0:25–1:05 · 40 seconds**

As a non-native English speaker, I have spent a lot of time trying to become more comfortable with the language. But learning English often felt almost like a second job. I already had research to do, papers to read, and other work to finish, and then I needed to find separate time to study English. The challenge was not a lack of reasons to learn. It was the extra task of making room for learning alongside everything else I wanted to do.

*Source: Presenter context. Personal experience.*


## 03. What If These Were the Same Activity?

**1:05–1:45 · 40 seconds**

That made me wonder whether those two activities really needed to stay separate. What if the things I already wanted to read could also help me learn English? Instead of choosing between reading something interesting and studying the language, I could keep reading, with an appropriate amount of support. This is the motivation behind Adapt-ER. We want to make self-selected web reading more workable for language learners, so that learning can fit into an activity they already care about.

*Source: Design framing; not a tested learning claim. Personal motivation and design question.*


## 04. The Web Has Everything. Except the Right Difficulty.

**1:45–2:25 · 40 seconds**

Our rationale here is that the web gives us an enormous choice of interesting material, but the difficulty of an article rarely matches an individual reader. You encounter an unfamiliar word, stop to look it up, return to the sentence, and then stop again at the next word. Each lookup may help locally, but repeated interruptions can make it hard to keep reading. Here, studying English depends on sustaining that reading activity with interesting, manageable material. So the problem is not simply finding something interesting to read; it is being able to keep reading it.

*Source: PDF pp. 2–4, Fig. 2 on p. 5. Paper motivation.*


## 05. The Article Stays. The Difficulty Changes.

**2:25–3:30 · 65 seconds**

That's why we develop Adapt-ER. Adapt-ER is a browser extension that adapts the page the reader already wants to read to their English proficiency. First, a short vocabulary-profiling step gives the system an initial picture of which words the reader knows. The reader then chooses an article, and Adapt-ER rewrites its text in place to make the vocabulary more manageable while keeping its context. As they read, they can mark individual words as known or unknown through lightweight interactions on the page. That feedback updates the vocabulary profile used for later adaptations, where I would like to clarify that our short study did not establish a long-term benefit from accumulating those updates. The important design rationale is that the learner keeps control over what to read, while the support stays inside the reading activity.

*Source: Fig. 1 on p. 1; Fig. 2 on p. 5; §4. System design.*


## 06. A Little Difficulty Is the Point.

**3:30–4:10 · 40 seconds**

Here, our goal is not to remove every unfamiliar word. Adapt-ER uses a target of about five percent unfamiliar words as a baseline. The system keeps some contextually important words, such as milestone, in this sleide, while simplifying other words, for example, convened can become gathered, and interdisciplinary can become between different fields. Note that five percent is a controllable design target we set arbitrarily, not a proven universal optimum for language learning.

*Source: Fig. 1 on p. 1; Fig. 3 on p. 7; §4. Difficulty control.*


## 07. We Asked an LLM to Do Everything. That Didn't Work.

**4:10–4:50 · 40 seconds**

So, you'll be curious about how our system works, and whether it is better than naively prompting LLMs. We first asked a language model to adapt an entire article while handling the vocabulary profile and the target ratio. With GPT-5, the mean unfamiliar-word ratio was close to target, around six percent, but an article took more than 200 seconds on average. The GPT-4.1 baseline was much faster, at 3.4 seconds, but its mean unfamiliar-word ratio was over ten percent. Those are two very different failures for a reading tool. We needed both controllable difficulty and a response time that could fit everyday browsing.

*Source: Table 1 on p. 8; §5.3. Pipeline evaluation.*


## 08. Let Code Count. Let LLMs Understand.

**4:50–5:35 · 45 seconds**

The solution was to divide the work according to what each part can do reliably. Code matches the vocabulary profile, counts occurrences, and calculates the unfamiliar-word budget, while the model ranks unfamiliar words by their importance in context. Code then constructs the Keep and Simplify lists and splits the article into paragraphs. The model rewrites each paragraph with those explicit constraints, and code sends the requests in parallel and reassembles the results. Our pipeline with GPT-4.1, which is quite a small model, averaged 5.71 percent unfamiliar words, 4.8 seconds per article, and two cents are needed per article; and this results shows that our pipeline anyway worked well.

*Source: Fig. 3 on p. 7; Table 1 on p. 8; §5.5. Hybrid pipeline.*


## 09. But Does It Actually Help People Read?

**5:35–6:05 · 30 seconds**

We evaluated Adapt-ER with twelve native Korean speakers learning English. Each person read Google News articles for twenty minutes per condition, one with Adapt-ER and one without, of course, in counterbalanced order. We asked whether adapting the page helped them sustain reading, rather than testing their English improvement.

*Source: §6.1 on pp. 8–9; Fig. 2 on p. 5. Within-subject evaluation.*


## 10. Less Decoding. More Reading.

**6:05–7:05 · 60 seconds**

Participants read faster with Adapt-ER and used the tooltip less often than when reading ordinary web pages. The paired tests gave a p-value of .00418 for reading speed and .0178 for tooltip use; the arrows show the direction of those findings, not a reconstructed effect size. That suggests the adapted pages reduced the amount of interruption involved in getting through an article. In interviews, participants described a shift from decoding unfamiliar words toward following the meaning, and one participant compared ordinary reading to working through an English exam. Reported pleasure, confidence, relaxation, and motivation were also descriptively higher, although we do not make significance claims for those ratings. These results concern the experience of reading during the session, not demonstrated gains in English proficiency.

*Source: Fig. 4 on p. 9; Table 2 and §6.3 on p. 10. Observed study results.*


## 11. We Didn't Prove Better English. We Made Reading More Workable.

**7:05–7:35 · 30 seconds**

In summary, we observed faster reading, fewer lookups, and descriptively higher reported engagement in this small study. We did not demonstrate vocabulary acquisition or long-term learning effects in English proficiency. It is also worth noting that the evaluation involved Korean speakers reading English news on a desktop, so other languages and device settings remain open questions.

*Source: §7.3 and §8 on p. 11. Scope and limitations.*


## 12. If AI Can Translate Everything, Why Learn Another Language?

**7:35–8:15 · 40 seconds**

Anyway, our promising results and Adapt-ER bring me to a question beyond our study: if AI can translate everything, why learn another language? Translation is useful, and I do not want to argue against it. But learning a language can build a relationship with people, culture, and history. Sometimes I want more than an answer in a language I know; I want help getting closer to the original. Adapt-ER makes me interested in AI that supports learning, alongside AI that can speak for us.

*Source: Speaker reflection; not an empirical paper finding. Personal reflection.*


## 13. Make the World More Learnable.

**8:15–9:00 · 45 seconds**

That is the future I hope this interaction points toward: making the world more learnable through the things we already want to do. Adapt-ER offers one small example, adapting English news in the reading context, with much more still to investigate. Extending this idea to other languages is a design opportunity, which is not something this study has established. The future I hope for is not one where we never have to learn another language. It's one where learning a language no longer has to be a separate or burdensome task. Thank you.

*Source: Speaker vision; not a tested cross-language claim. Closing vision.*
