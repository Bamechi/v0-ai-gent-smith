export interface DictionaryTerm {
  id: string
  term: string
  definition: string
  category: string
}

export const dictionaryTerms: DictionaryTerm[] = [
  {
    id: "1",
    term: "Accuracy",
    definition:
      "How often a model gets the right answer compared to the truth. In classification, it's simply \"correct predictions ÷ total predictions.\" It can be misleading when one class shows up far more than others, so it's usually paired with precision and recall.",
    category: "Model Evaluation",
  },
  {
    id: "2",
    term: "Activation Function",
    definition:
      'A function inside a neural network that decides whether a neuron "fires." It adds non-linearity, which is what lets deep models learn complex patterns. Without activation functions, a neural network would act like a basic linear model.',
    category: "Neural Networks",
  },
  {
    id: "3",
    term: "Active Learning",
    definition:
      "A training method where the model flags the next data points that would be most valuable to label. That way, humans spend time labeling the highest-impact examples instead of everything. It's especially useful when labels are expensive or slow to get.",
    category: "Training Methods",
  },
  {
    id: "4",
    term: "AdaBoost",
    definition:
      'An ensemble technique that turns a bunch of "okay" models into one stronger model. It keeps paying extra attention to the examples earlier models got wrong, improving step by step.',
    category: "Machine Learning",
  },
  {
    id: "5",
    term: "Adversarial Example",
    definition:
      "An input that's been intentionally tweaked—sometimes in a way humans barely notice—to make a model fail. In images, tiny pixel changes can flip a label. In text, carefully engineered prompts can push a model into wrong or unsafe outputs.",
    category: "AI Security",
  },
  {
    id: "6",
    term: "Adversarial Learning",
    definition:
      "A training setup where models compete in a way that improves results. The classic example is GANs: one model generates outputs, another tries to spot what's fake. That pressure makes the generator produce more realistic results over time.",
    category: "Training Methods",
  },
  {
    id: "7",
    term: "Agent",
    definition:
      'An AI system that can plan and take actions to reach a goal. Instead of replying once like a chatbot, an agent can use tools, check its work, and keep going until the task is done. It\'s the shift from "AI answers" to "AI execution."',
    category: "Agentic AI",
  },
  {
    id: "8",
    term: "Agentic AI",
    definition:
      "AI designed to operate more like an ongoing worker: it plans, executes, monitors outcomes, and adjusts as things change. In business terms, this is the move from a content helper to an ops helper.",
    category: "Agentic AI",
  },
  {
    id: "9",
    term: "Agent Orchestration",
    definition:
      "The layer that coordinates multiple agents, tools, and systems. It decides who does what, in what order, what happens when something fails, and what permissions apply. Think of it as air traffic control for multi-step AI work.",
    category: "Agentic AI",
  },
  {
    id: "10",
    term: "Algorithm",
    definition:
      "A set of steps or rules for solving a problem. In AI, algorithms shape how models learn during training and how they produce outputs during inference. A model is basically algorithms + data + compute, packaged into something usable.",
    category: "Fundamentals",
  },
  {
    id: "11",
    term: "Alignment",
    definition:
      'Making sure an AI system behaves the way people actually want it to—safely and reliably. That includes guardrails, refusal rules, and "don\'t do harm" constraints. It also includes practical alignment: getting the model to consistently follow your business goals and policies.',
    category: "AI Safety",
  },
  {
    id: "12",
    term: "Annotation",
    definition:
      "Labeling data so models can learn from it—tagging images, marking intent in emails, labeling outcomes, and so on. Great annotations usually mean better models. Messy labels often lead to confident, wrong behavior.",
    category: "Data",
  },
  {
    id: "13",
    term: "Anomaly Detection",
    definition:
      "Spotting data points that don't match normal patterns—fraud, defects, system intrusions, strange behavior in logs, and more. It's one of the most common business use cases because it's often high ROI without being overly complicated.",
    category: "Use Cases",
  },
  {
    id: "14",
    term: "API",
    definition:
      "A structured way for software systems to communicate with each other. In AI, APIs let models call tools, pull data, trigger automations, and plug into real apps. APIs are how AI moves beyond chat and into actual workflows.",
    category: "Infrastructure",
  },
  {
    id: "15",
    term: "Approximation",
    definition:
      "Most models don't \"solve reality\"—they approximate patterns well enough to be useful. That's fine until you hit edge cases, where the approximation can break. Knowing where it breaks is a big part of deploying AI safely.",
    category: "Fundamentals",
  },
  {
    id: "16",
    term: "Artificial General Intelligence (AGI)",
    definition:
      "A hypothetical kind of AI that can handle most intellectual tasks humans can, across many domains. It implies broad understanding and the ability to transfer skills between problems. People use AGI more as a milestone concept than a product category.",
    category: "AI Concepts",
  },
  {
    id: "17",
    term: "Artificial Intelligence (AI)",
    definition:
      "Technology that performs tasks we associate with human intelligence: language, perception, reasoning, decision-making, and more. AI includes machine learning, deep learning, and symbolic methods. In simple business terms, AI turns data and compute into automated capability.",
    category: "Fundamentals",
  },
  {
    id: "18",
    term: "Artificial Neural Network (ANN)",
    definition:
      'A model structure inspired by the brain, built from layers of connected "neurons." It learns by adjusting internal weights during training. Many modern systems for vision, speech, and language are built on neural networks.',
    category: "Neural Networks",
  },
  {
    id: "19",
    term: "Attention Mechanism",
    definition:
      'A technique that helps a model focus on the most relevant parts of an input. In language models, attention lets the system "look back" across words and connect meaning across a long sequence. It\'s a major reason transformer models work so well.',
    category: "Neural Networks",
  },
  {
    id: "20",
    term: "Audit (AI Audit)",
    definition:
      "A formal review of an AI system for accuracy, fairness, compliance, and risk. Audits look at training data, model behavior, and outcomes in the real world. In regulated industries, they help protect the company and reduce legal exposure.",
    category: "Governance",
  },
  {
    id: "21",
    term: "Backpropagation",
    definition:
      "The core process neural networks use to learn from mistakes. It traces errors backward through the network to see how much each weight contributed, then adjusts those weights to reduce future errors. This is the engine that makes deep learning possible.",
    category: "Neural Networks",
  },
  {
    id: "22",
    term: "Bagging",
    definition:
      "An ensemble method that trains multiple models on different random slices of the same dataset. Their predictions are combined—often averaged—to produce a more stable result. Bagging helps reduce overfitting and smooth out noise.",
    category: "Machine Learning",
  },
  {
    id: "23",
    term: "Bag of Words",
    definition:
      "A basic way to represent text by counting how often each word appears, ignoring order and context. It's fast and simple, but it misses meaning. Modern embeddings and transformer models usually perform far better.",
    category: "NLP",
  },
  {
    id: "24",
    term: "Batch Normalization",
    definition:
      "A technique that stabilizes and speeds up training by normalizing inputs within a neural network layer. It reduces sensitivity to weight initialization and helps deeper networks train reliably. This was a key step in scaling deep models.",
    category: "Neural Networks",
  },
  {
    id: "25",
    term: "Bayes / Bayesian Network",
    definition:
      "A probabilistic approach to modeling uncertainty and relationships between variables. Bayesian networks explicitly represent dependencies and conditional probabilities. They're especially useful when uncertainty and interpretability matter.",
    category: "Machine Learning",
  },
  {
    id: "26",
    term: "BERT",
    definition:
      "A transformer-based language model architecture originally developed by Google. It reads text in both directions, which helps it understand context more deeply. BERT heavily influenced enterprise NLP systems and many models that followed.",
    category: "Language Models",
  },
  {
    id: "27",
    term: "Bias (Model Bias)",
    definition:
      "A consistent error pattern caused by assumptions in data, features, or training methods. Bias can also refer to unfair outcomes that disproportionately affect certain groups. In practice, teams need to test for both technical bias and social bias.",
    category: "Model Evaluation",
  },
  {
    id: "28",
    term: "Big Data",
    definition:
      "Datasets so large or complex they require specialized storage and processing systems. Big data supports personalization, forecasting, and large-scale model training. Size alone doesn't create value—the signal quality does.",
    category: "Data",
  },
  {
    id: "29",
    term: "Binary Classification",
    definition:
      "A prediction task with only two possible outcomes, such as yes/no or fraud/not fraud. It's common in compliance, risk, and decision automation. Performance is usually tracked with metrics like precision, recall, and ROC-AUC.",
    category: "Machine Learning",
  },
  {
    id: "30",
    term: "Black Box Model",
    definition:
      "A model whose internal decision process is difficult to explain or interpret. Many high-performing deep models fall into this category. This lack of transparency is why explainability and governance matter in high-stakes use cases.",
    category: "Model Evaluation",
  },
  {
    id: "31",
    term: "Boosting",
    definition:
      "An ensemble approach where models are trained sequentially, each one focusing on correcting the mistakes of the previous ones. Techniques like gradient boosting and XGBoost are especially strong for structured business data.",
    category: "Machine Learning",
  },
  {
    id: "32",
    term: "Bot",
    definition:
      "An automated program that performs tasks repeatedly. In AI systems, bots often handle chat, monitoring, scraping, or workflow steps. Compared to agents, bots usually have limited planning and decision-making depth.",
    category: "Automation",
  },
  {
    id: "33",
    term: "Calibration",
    definition:
      "A measure of whether a model's confidence matches reality. If a model says it's 80% confident, it should be right about 80% of the time. Calibration is critical when decisions depend on risk thresholds.",
    category: "Model Evaluation",
  },
  {
    id: "34",
    term: "Chatbot",
    definition:
      "An interface that lets users interact with software through conversation. Modern chatbots are often powered by language models and retrieval systems, not fixed scripts. They become far more useful when connected to real tools and data.",
    category: "Use Cases",
  },
  {
    id: "35",
    term: "ChatGPT",
    definition:
      "A widely used AI assistant built on large language models, designed for conversation, writing, reasoning, and tool use. It's best understood as a combination of an LLM, a product interface, and an ecosystem of integrations.",
    category: "Products",
  },
  {
    id: "36",
    term: "Classification",
    definition:
      "A task where a model assigns a category to an input, such as labeling email as spam or identifying a topic. It's one of the most common machine learning problems. Many AI automations are simply classification at scale.",
    category: "Machine Learning",
  },
  {
    id: "37",
    term: "Claude",
    definition:
      "A large language model-based assistant focused on writing, reasoning, and analysis. Like similar tools, it combines model capabilities with safety policies and product design. Teams often choose it based on reliability and workflow fit.",
    category: "Products",
  },
  {
    id: "38",
    term: "Clustering",
    definition:
      "Grouping similar items together without using labeled data. It's used for customer segmentation, topic discovery, anomaly detection, and organizing large datasets. Clustering is a core example of unsupervised learning.",
    category: "Machine Learning",
  },
  {
    id: "39",
    term: "Compute",
    definition:
      "The processing power needed to train and run AI models. This includes GPUs or TPUs, memory, and optimized inference systems. In business settings, compute is a major cost that must be actively managed.",
    category: "Infrastructure",
  },
  {
    id: "40",
    term: "Confidence Score",
    definition:
      "A numerical estimate of how sure a model is about its prediction. Confidence can be misleading if the model isn't well calibrated. Teams often use confidence scores to decide when to involve a human.",
    category: "Model Evaluation",
  },
  {
    id: "41",
    term: "Context Window",
    definition:
      "The amount of information a model can consider at once during a request. Anything outside that window may be ignored or approximated. Retrieval systems and summarization are common ways to work around this limit.",
    category: "Language Models",
  },
  {
    id: "42",
    term: "Continual Learning",
    definition:
      "The practice of updating a model as new data becomes available. While it can keep systems relevant, it also introduces the risk of performance drift. Ongoing monitoring is essential.",
    category: "Training Methods",
  },
  {
    id: "43",
    term: "Convolutional Neural Network (CNN)",
    definition:
      "A neural network architecture that dominated early image recognition tasks. CNNs learn visual patterns like edges and textures through convolution layers. Even with newer approaches, they remain foundational in computer vision.",
    category: "Neural Networks",
  },
  {
    id: "44",
    term: "Copilot",
    definition:
      "An AI assistant designed to work alongside a human inside a specific tool, such as coding editors or document software. The goal is augmentation rather than autonomy. Copilots are most effective when they understand context and can take limited actions.",
    category: "Products",
  },
  {
    id: "45",
    term: "Cost Function (Loss Function)",
    definition:
      "A mathematical function that measures how wrong a model's predictions are. Training works by minimizing this value over time. The loss function defines what success looks like during learning.",
    category: "Training Methods",
  },
  {
    id: "46",
    term: "Data Drift",
    definition:
      "When real-world data slowly changes and no longer looks like the data a model was trained on. As drift increases, accuracy and reliability drop. Monitoring drift is a core part of responsible AI deployment.",
    category: "Deployment",
  },
  {
    id: "47",
    term: "Data Governance",
    definition:
      "The rules and controls around how data is collected, stored, used, and shared. In AI systems, governance protects privacy, improves data quality, and reduces risk. It's how organizations scale AI without losing control.",
    category: "Governance",
  },
  {
    id: "48",
    term: "Data Labeling",
    definition:
      "Adding tags or correct answers to raw data so models can learn from it. Label quality has a direct impact on model quality. Many teams discover too late that labeling is one of the biggest hidden costs in AI.",
    category: "Data",
  },
  {
    id: "49",
    term: "Data Privacy",
    definition:
      "Safeguarding personal and sensitive data used by AI systems. Privacy covers legal compliance as well as ethical responsibility. Strong privacy practices increase trust and make enterprise adoption easier.",
    category: "Governance",
  },
  {
    id: "50",
    term: "Dataset",
    definition:
      "A collection of data used to train, validate, and test models. Datasets can be structured, like tables, or unstructured, like text, images, or audio. In practice, dataset quality matters more than sheer size.",
    category: "Data",
  },
  {
    id: "51",
    term: "Decision Boundary",
    definition:
      "The point where a model switches from predicting one class to another. Understanding these boundaries helps explain errors and edge cases. In high-risk systems, boundaries are closely examined and stress-tested.",
    category: "Machine Learning",
  },
  {
    id: "52",
    term: "Deep Learning",
    definition:
      "A branch of machine learning built on multi-layer neural networks. It powers modern language models, image recognition, and speech systems. Deep learning usually requires more data and compute than traditional approaches.",
    category: "Machine Learning",
  },
  {
    id: "53",
    term: "Diffusion Model",
    definition:
      "A type of generative model that creates outputs by gradually turning noise into structure. This step-by-step refinement produces high-quality images and is increasingly used for video and audio as well. Many text-to-image tools rely on diffusion.",
    category: "Generative AI",
  },
  {
    id: "54",
    term: "Distillation",
    definition:
      "Transferring knowledge from a large model into a smaller one while keeping most of its performance. Distillation reduces cost and latency. It's a common way to make AI affordable at scale.",
    category: "Training Methods",
  },
  {
    id: "55",
    term: "Domain Adaptation",
    definition:
      "Modifying a model trained in one environment so it performs well in another. For example, adapting a general language model to legal or medical text. This is critical when real-world data differs from public training data.",
    category: "Training Methods",
  },
  {
    id: "56",
    term: "Edge AI",
    definition:
      "Running AI directly on devices like phones, cameras, or sensors instead of in the cloud. This lowers latency and improves privacy. Edge AI enables real-time decisions even without a constant internet connection.",
    category: "Infrastructure",
  },
  {
    id: "57",
    term: "Embedding",
    definition:
      "A numeric representation of meaning stored as a vector. Embeddings allow systems to search and compare content by similarity rather than exact keywords. They power semantic search, recommendations, and retrieval-based systems.",
    category: "NLP",
  },
  {
    id: "58",
    term: "Emergent Behavior",
    definition:
      "Unexpected abilities that appear as models grow larger and more complex. These behaviors aren't explicitly programmed and often show up only at scale. Emergence is why testing and safety checks matter, even for simple-looking systems.",
    category: "AI Concepts",
  },
  {
    id: "59",
    term: "Ensemble Model",
    definition:
      "A system that combines multiple models to produce a stronger result than any single one. Ensembles improve stability and reduce error. They're common in risk modeling and structured prediction tasks.",
    category: "Machine Learning",
  },
  {
    id: "60",
    term: "Ethics (AI Ethics)",
    definition:
      "The principles guiding how AI is built and used. Ethics covers fairness, harm prevention, privacy, transparency, and accountability. For organizations, ethical AI protects long-term trust and reputation.",
    category: "Governance",
  },
  {
    id: "61",
    term: "Evaluation (Evals)",
    definition:
      "The process of testing an AI system against benchmarks, real tasks, and known failure modes. Evaluations measure quality, safety, and reliability. The most useful evals reflect real-world use, not abstract scores.",
    category: "Model Evaluation",
  },
  {
    id: "62",
    term: "Explainability",
    definition:
      "The ability to understand and communicate how an AI system makes decisions. This can include feature importance, reasoning steps, or simplified explanations. Explainability is especially important in regulated and high-stakes environments.",
    category: "Governance",
  },
  {
    id: "63",
    term: "Fairness",
    definition:
      "Making sure AI outcomes are equitable across different groups and situations. Fairness can be defined in multiple ways, which means teams must choose a standard and measure against it. It's both a technical challenge and a trust issue.",
    category: "Governance",
  },
  {
    id: "64",
    term: "Feature",
    definition:
      "An input signal a model uses to make predictions, such as age, purchase history, or words in text. Feature quality strongly affects performance. Even in deep learning systems, good inputs still matter.",
    category: "Data",
  },
  {
    id: "65",
    term: "Feature Engineering",
    definition:
      "The practice of designing and selecting the most useful features for a model. In classical machine learning, this can dramatically boost results. In modern AI, it often shows up as data structuring, labeling strategy, and retrieval design.",
    category: "Data",
  },
  {
    id: "66",
    term: "Federated Learning",
    definition:
      "Training models across many devices without moving raw data to a central location. This approach improves privacy and compliance. It's commonly used in healthcare, finance, and mobile systems.",
    category: "Training Methods",
  },
  {
    id: "67",
    term: "Fine-Tuning",
    definition:
      "Further training a pre-trained model on specialized data to improve performance on a specific task. Fine-tuning helps with domain knowledge and brand voice. It also requires oversight, since it can reinforce bias if done poorly.",
    category: "Training Methods",
  },
  {
    id: "68",
    term: "Foundation Model",
    definition:
      "A large, general-purpose model trained on broad datasets and adaptable to many tasks. Language and vision models often fall into this category. They become enterprise-ready through retrieval systems, guardrails, and customization.",
    category: "Language Models",
  },
  {
    id: "69",
    term: "Function Calling",
    definition:
      "A technique where an AI model produces structured calls to tools or APIs instead of plain text. This enables reliable actions like booking meetings or fetching records. Function calling is a core building block for agent-based systems.",
    category: "Agentic AI",
  },
  {
    id: "70",
    term: "GAN (Generative Adversarial Network)",
    definition:
      "A generative setup where two models compete: one creates samples and the other judges them. That back-and-forth pushes the generator to produce more realistic results. GANs were central to early generative media before diffusion models took over many image tasks.",
    category: "Generative AI",
  },
  {
    id: "71",
    term: "Generalization",
    definition:
      "A model's ability to perform well on data it hasn't seen before. Strong results during training don't guarantee this. What matters is consistent performance in real-world conditions.",
    category: "Model Evaluation",
  },
  {
    id: "72",
    term: "Gemini",
    definition:
      "A family of AI systems positioned as multimodal, handling text, images, and more. Like other flagship assistants, it's better thought of as an ecosystem than a single model. In practice, workflow integration and context handling matter as much as raw capability.",
    category: "Products",
  },
  {
    id: "73",
    term: "Generative AI",
    definition:
      "AI that produces new content such as text, images, audio, or video based on learned patterns. It's used for creation, ideation, synthesis, and simulation. In business settings, it acts as a production multiplier when paired with strong governance.",
    category: "Generative AI",
  },
  {
    id: "74",
    term: "Gradient Descent",
    definition:
      "An optimization method that updates model parameters to reduce error step by step. It's the core process behind most training. Variants exist to improve speed, stability, and convergence.",
    category: "Training Methods",
  },
  {
    id: "75",
    term: "Grounding",
    definition:
      'Tying AI outputs to trusted sources or provided context. Grounding reduces hallucinations and improves reliability. In real systems, it\'s usually done through retrieval and strict "answer from data only" rules.',
    category: "AI Safety",
  },
  {
    id: "76",
    term: "Guardrails",
    definition:
      "Safety rules and constraints that limit harmful, unsafe, or unwanted behavior. Guardrails can include content filters, refusal policies, and approval workflows. They protect users, brands, and organizations.",
    category: "AI Safety",
  },
  {
    id: "77",
    term: "Hallucination",
    definition:
      "When an AI generates information that sounds convincing but is false. Hallucinations become dangerous when users trust confident language. The strongest defenses are grounding, retrieval, and rigorous evaluation.",
    category: "AI Safety",
  },
  {
    id: "78",
    term: "Heuristic",
    definition:
      "A practical rule of thumb used to make quick decisions. In AI systems, heuristics often guide prompting, routing, and fallback logic. They usually sit around the model as control mechanisms.",
    category: "Fundamentals",
  },
  {
    id: "79",
    term: "Hidden Layer",
    definition:
      "A layer in a neural network that processes inputs before producing an output. Hidden layers learn internal representations of the data. Deeper networks use more hidden layers to capture complex patterns.",
    category: "Neural Networks",
  },
  {
    id: "80",
    term: "Human-in-the-Loop (HITL)",
    definition:
      "A workflow where humans review, approve, or correct AI outputs. This improves quality and reduces risk. HITL is common in regulated industries and high-stakes decisions.",
    category: "Deployment",
  },
  {
    id: "81",
    term: "Hyperparameter",
    definition:
      "A training setting chosen by humans, such as learning rate, batch size, or temperature. These choices can significantly affect performance. Hyperparameters are tuned during experimentation.",
    category: "Training Methods",
  },
  {
    id: "82",
    term: "Inference",
    definition:
      "The process of generating outputs from a trained model. Inference is what happens when a system runs in production. At scale, cost and latency are usually dominated by inference.",
    category: "Deployment",
  },
  {
    id: "83",
    term: "Input Modality",
    definition:
      "The type of data an AI system accepts, such as text, images, audio, or video. Multimodal systems support more than one modality. Modality determines which workflows a model can support.",
    category: "Fundamentals",
  },
  {
    id: "84",
    term: "Interpretability",
    definition:
      "How well humans can understand why a model made a particular decision. Interpretability goes deeper than surface-level explanations and supports debugging and governance. It's critical in high-risk systems.",
    category: "Governance",
  },
  {
    id: "85",
    term: "Jailbreak",
    definition:
      "A method used to bypass a model's safety restrictions. Jailbreaks can rely on social engineering or technical prompt patterns. Preventing them is a security and brand-protection concern.",
    category: "AI Security",
  },
  {
    id: "86",
    term: "Knowledge Base",
    definition:
      "A curated source of trusted information that supports AI responses. It can include documents, databases, wikis, or internal notes. Modern systems connect knowledge bases through embeddings and retrieval.",
    category: "Infrastructure",
  },
  {
    id: "87",
    term: "Knowledge Distillation",
    definition:
      "A focused form of distillation where a smaller model learns to mimic a larger one's behavior. This preserves much of the capability while reducing cost. It's a common approach for efficient deployment.",
    category: "Training Methods",
  },
  {
    id: "88",
    term: "Labelled Data",
    definition:
      "Data where each example includes a correct answer or tag. Labeled data is the foundation of supervised learning. Poor or inconsistent labels teach models the wrong patterns.",
    category: "Data",
  },
  {
    id: "89",
    term: "LangChain",
    definition:
      "A framework used to connect language models to tools, memory, and data sources. It supports building systems that go beyond chat, including retrieval and agent-style workflows.",
    category: "Infrastructure",
  },
  {
    id: "90",
    term: "Large Language Model (LLM)",
    definition:
      "A model trained on massive text datasets to understand and generate language. LLMs can write, summarize, reason, and transform text. Their value increases significantly when paired with tools and external data.",
    category: "Language Models",
  },
  {
    id: "91",
    term: "Latency",
    definition:
      "The delay between input and output. Low latency is essential for real-time experiences like support, voice, and copilots. Teams manage latency through model choice, caching, and infrastructure optimization.",
    category: "Deployment",
  },
  {
    id: "92",
    term: "Latent Space",
    definition:
      "An internal space where models represent meaning as vectors or coordinates. Similar ideas tend to cluster together. Latent space explains how embeddings work and how generative models blend concepts.",
    category: "Neural Networks",
  },
  {
    id: "93",
    term: "Learning Rate",
    definition:
      "A training setting that controls how quickly model weights update. If it's too high, learning becomes unstable; too low, and training drags on. It's one of the most influential hyperparameters.",
    category: "Training Methods",
  },
  {
    id: "94",
    term: "Loss Function",
    definition:
      "A function that measures how far a model's output is from the desired result. Training works by minimizing this value over time. Different tasks rely on different loss formulations.",
    category: "Training Methods",
  },
  {
    id: "95",
    term: "Machine Learning (ML)",
    definition:
      'A branch of AI where systems learn patterns from data instead of being programmed with explicit rules. It includes supervised, unsupervised, and reinforcement learning. Most real-world "business AI" is machine learning.',
    category: "Fundamentals",
  },
  {
    id: "96",
    term: "Model",
    definition:
      "A trained system that turns inputs into outputs—predicting, classifying, generating, or recommending. In practical terms, a model is packaged intelligence you can run inside a product or workflow.",
    category: "Fundamentals",
  },
  {
    id: "97",
    term: "Model Card",
    definition:
      "A short, standardized document that explains what a model is for, how it was trained, what data it uses, and where it can fail. Model cards improve transparency and make governance easier, especially in enterprise settings.",
    category: "Governance",
  },
  {
    id: "98",
    term: "Model Collapse",
    definition:
      "When models get trained heavily on AI-generated content instead of grounded, real-world data—and performance starts degrading. Over time, the training signal becomes recycled, which can shrink diversity and reduce accuracy.",
    category: "AI Safety",
  },
  {
    id: "99",
    term: "Model Drift",
    definition:
      "When a model's real-world performance changes after deployment because the environment, user behavior, or data patterns shift. Drift can happen quietly and build risk over time. Monitoring and retraining plans are how you stay ahead of it.",
    category: "Deployment",
  },
  {
    id: "100",
    term: "Moderation",
    definition:
      "Systems that filter, block, or control content to prevent harmful or unsafe outputs. Moderation is a key part of safety and brand protection. Good moderation protects people without making the product feel unusable.",
    category: "AI Safety",
  },
  {
    id: "101",
    term: "Multimodal AI",
    definition:
      "AI that can work across multiple types of data—text, images, audio, video, and more—often in the same task. This enables things like analyzing screenshots, interpreting charts, or generating video. It's one of the reasons AI can feel like a real assistant.",
    category: "AI Concepts",
  },
  {
    id: "102",
    term: "Narrow AI (Weak AI)",
    definition:
      "AI built for specific tasks rather than broad, human-level intelligence. Almost all AI in use today is narrow AI. It can be extremely capable in its lane and completely unreliable outside it.",
    category: "AI Concepts",
  },
  {
    id: "103",
    term: "Natural Language Processing (NLP)",
    definition:
      "AI focused on understanding and generating human language. NLP includes translation, summarization, classification, entity extraction, and more. Large language models are a major leap forward in this space.",
    category: "NLP",
  },
  {
    id: "104",
    term: "Neural Network",
    definition:
      "A model made of connected nodes that learns by adjusting internal weights. Neural networks are the foundation of deep learning. With the right data, compute, and design, they can learn powerful patterns.",
    category: "Neural Networks",
  },
  {
    id: "105",
    term: "Node (Neuron)",
    definition:
      "A single unit inside a neural network that transforms inputs using weights and an activation function. Nodes combine into layers, and layers combine into networks. Each node learns a small piece of the overall pattern.",
    category: "Neural Networks",
  },
  {
    id: "106",
    term: "Overfitting",
    definition:
      'When a model learns the training data too specifically and doesn\'t perform well on new data. It often looks like "great in testing, bad in production." Better data, simpler models, and regularization help reduce overfitting.',
    category: "Model Evaluation",
  },
  {
    id: "107",
    term: "Optimization",
    definition:
      "Improving a system's performance, cost, or speed. This can mean training improvements, faster inference, or smarter system design. In business, optimization is how AI moves from impressive to profitable.",
    category: "Training Methods",
  },
  {
    id: "108",
    term: "Out-of-Distribution (OOD)",
    definition:
      "Inputs that don't resemble what the model saw during training. OOD cases are where models are most likely to fail, hallucinate, or behave unpredictably. Detecting OOD is important for safety and for routing cases to humans.",
    category: "AI Safety",
  },
  {
    id: "109",
    term: "Parameter",
    definition:
      'A learned value inside a model—usually a weight—that gets adjusted during training. More parameters can mean more capability, but also more compute cost. The "best" model is the one that hits your target performance at the lowest practical cost.',
    category: "Neural Networks",
  },
  {
    id: "110",
    term: "P(Doom)",
    definition:
      "A term in AI safety discussions that refers to someone's estimate of the probability of catastrophic outcomes from AI. People strongly disagree on the number, but the concept is a reminder that downside risk deserves serious planning.",
    category: "AI Safety",
  },
  {
    id: "111",
    term: "Personalization",
    definition:
      "Adjusting AI outputs to better match an individual user's preferences, history, or context. Done well, it improves results and retention. It also raises privacy and data-handling requirements.",
    category: "Use Cases",
  },
  {
    id: "112",
    term: "Pipeline (AI Pipeline)",
    definition:
      "The end-to-end workflow for building and running AI systems: data → training → evaluation → deployment → monitoring. Pipelines make AI repeatable and scalable. Without a pipeline, systems become fragile and chaotic.",
    category: "Infrastructure",
  },
  {
    id: "113",
    term: "Prompt",
    definition:
      'The input you give a language model—an instruction, question, or set of context. Prompts shape the output\'s quality, tone, and behavior. The best prompts are clear about the goal, constraints, and what "good" looks like.',
    category: "Prompt Engineering",
  },
  {
    id: "114",
    term: "Prompt Engineering",
    definition:
      "Designing prompts in a systematic way to get consistent, high-quality results. This includes structure, examples, constraints, and tool instructions. It's often the fastest way to improve outcomes without retraining anything.",
    category: "Prompt Engineering",
  },
  {
    id: "115",
    term: "Prompt Injection",
    definition:
      "A malicious or unintended instruction that hijacks a model's behavior—often hidden inside text pulled from documents or webpages. It can lead to data leakage or unwanted actions. Common defenses include strict tool permissions, input sanitization, and sandboxing.",
    category: "AI Security",
  },
  {
    id: "116",
    term: "Quantization",
    definition:
      "Reducing the precision of a model's weights so it runs faster and cheaper. Quantized models can run on smaller hardware and lower-cost infrastructure. The tradeoff is sometimes a small drop in quality.",
    category: "Deployment",
  },
  {
    id: "117",
    term: "RAG (Retrieval-Augmented Generation)",
    definition:
      "A setup where the AI pulls in relevant documents or data before generating a response. This improves accuracy and reduces hallucinations, especially with private or internal knowledge. RAG is the default pattern for most enterprise AI assistants.",
    category: "Infrastructure",
  },
  {
    id: "118",
    term: "Ranking / Re-Ranking",
    definition:
      "Ordering results by relevance, such as search results or retrieved documents. Re-ranking refines that order to surface the most useful items. In many systems, ranking decisions matter more than the generation step itself.",
    category: "Infrastructure",
  },
  {
    id: "119",
    term: "Red Teaming",
    definition:
      "Actively stress-testing AI systems by trying to break them—bypassing safety rules, triggering harmful outputs, or exposing failure modes. Red teaming finds weaknesses before real users do. It's pressure testing for reliability and safety.",
    category: "AI Safety",
  },
  {
    id: "120",
    term: "Regression",
    definition:
      "A prediction task where the output is a number rather than a category, like revenue, time, or a risk score. Regression is common in forecasting and planning. It relies on error metrics such as MAE or RMSE to judge performance.",
    category: "Machine Learning",
  },
  {
    id: "121",
    term: "Reinforcement Learning (RL)",
    definition:
      "A learning approach based on rewards and penalties. The system learns by interacting with an environment and choosing actions that maximize long-term reward. RL is used in robotics, games, and some alignment techniques.",
    category: "Training Methods",
  },
  {
    id: "122",
    term: "RLHF (Reinforcement Learning from Human Feedback)",
    definition:
      "A method where humans score or rank model outputs, and the model is trained to align with those preferences. RLHF improves usefulness and reduces harmful behavior. It's a big reason modern assistants feel more refined.",
    category: "Training Methods",
  },
  {
    id: "123",
    term: "Responsible AI",
    definition:
      "A practical approach to building AI that is safe, fair, transparent, and accountable. It includes governance, audits, monitoring, and user protections. Responsible AI is how organizations scale trust alongside capability.",
    category: "Governance",
  },
  {
    id: "124",
    term: "Robustness",
    definition:
      "How well a system holds up under noisy inputs, edge cases, or adversarial conditions. Robust models don't fall apart when the environment gets messy. This is often the difference between a demo and a deployable product.",
    category: "Model Evaluation",
  },
  {
    id: "125",
    term: "Safety (AI Safety)",
    definition:
      "Practices that prevent AI from causing harm, failing unpredictably, or being misused. Safety includes testing, policy controls, and ongoing monitoring. In business, safety protects users, brand, and compliance.",
    category: "AI Safety",
  },
  {
    id: "126",
    term: "Sampling",
    definition:
      "How a generative model selects its next output. Different sampling methods balance creativity versus consistency. This is why the same prompt can produce different results.",
    category: "Generative AI",
  },
  {
    id: "127",
    term: "Self-Supervised Learning",
    definition:
      "Learning from unlabeled data by predicting parts of the data from other parts. Most large language models are trained this way. It's how models learn structure and patterns at scale.",
    category: "Training Methods",
  },
  {
    id: "128",
    term: "Sentiment Analysis",
    definition:
      "Identifying emotional tone in text, such as positive, negative, or neutral. It's widely used for reviews, customer support, and brand monitoring. Results can be skewed by sarcasm or cultural nuance.",
    category: "NLP",
  },
  {
    id: "129",
    term: "Synthetic Data",
    definition:
      "Artificially generated data used for training or testing models. It's helpful when real data is limited or sensitive. Synthetic data still needs validation to avoid introducing unrealistic patterns.",
    category: "Data",
  },
  {
    id: "130",
    term: "Sycophancy",
    definition:
      "When an AI agrees with a user even when the user is wrong. This can reinforce bad decisions and false confidence. Clear instructions and safer model behavior help reduce it.",
    category: "AI Safety",
  },
  {
    id: "131",
    term: "Temperature",
    definition:
      "A setting that controls randomness in generated outputs. Higher values increase variety but reduce predictability. Lower values produce more consistent results and are often better for business use.",
    category: "Generative AI",
  },
  {
    id: "132",
    term: "Text-to-Image",
    definition:
      "Generating images from written prompts. This is used in design, marketing, concept development, and creative work. Output quality depends on the model, prompt clarity, and constraints.",
    category: "Generative AI",
  },
  {
    id: "133",
    term: "Token",
    definition:
      "A unit of text used by language models to process and generate language. Tokens aren't exactly words—they're chunks of text. Token usage affects cost, speed, and context limits.",
    category: "Language Models",
  },
  {
    id: "134",
    term: "Topic Modeling (LDA)",
    definition:
      "Automatically identifying themes across large collections of documents. Topic modeling helps organize and explore text at scale. It's commonly used in research and knowledge management.",
    category: "NLP",
  },
  {
    id: "135",
    term: "Transformer Architecture",
    definition:
      "A neural network design built around attention mechanisms. Transformers efficiently process sequences and power modern language and vision models. This architecture underpins today's generative AI wave.",
    category: "Neural Networks",
  },
  {
    id: "136",
    term: "Transparency",
    definition:
      "Being clear about how an AI system works, what it can and can't do, and what data it relies on. Transparency builds trust and supports governance. It also reduces unrealistic expectations about AI.",
    category: "Governance",
  },
  {
    id: "137",
    term: "Turing Test",
    definition:
      "A classic test where a machine \"passes\" if people can't tell it apart from a human in conversation. It's historically important but not a full measure of intelligence. Sounding human doesn't guarantee reliability or alignment.",
    category: "AI Concepts",
  },
  {
    id: "138",
    term: "Uncertainty",
    definition:
      "The likelihood that a model's output could be wrong. Many systems don't naturally express uncertainty well. Good designs detect uncertainty and route decisions accordingly.",
    category: "Model Evaluation",
  },
  {
    id: "139",
    term: "Unsupervised Learning",
    definition:
      "Learning patterns from data without labeled answers. It's used for clustering, anomaly detection, and discovery. This approach is powerful for finding structure rather than making direct predictions.",
    category: "Machine Learning",
  },
  {
    id: "140",
    term: "Upscaling",
    definition:
      "Using AI to increase image or video resolution. Upscaling improves clarity and usability of visual assets. It's common in media production and restoration.",
    category: "Generative AI",
  },
  {
    id: "141",
    term: "Validation Set",
    definition:
      "A dataset used during training to tune settings and catch overfitting. It's separate from the final test set. Validation helps ensure a model is ready before release.",
    category: "Data",
  },
  {
    id: "142",
    term: "Variance",
    definition:
      "How sensitive a model is to changes in training data. High variance can lead to overfitting and unstable outputs. Techniques like ensembles and regularization help control it.",
    category: "Model Evaluation",
  },
  {
    id: "143",
    term: "Vector",
    definition:
      "A list of numbers representing an object or concept. In AI, vectors often capture meaning through embeddings. Vector math enables similarity search and clustering.",
    category: "Fundamentals",
  },
  {
    id: "144",
    term: "Vector Database",
    definition:
      "A database designed to store and search vectors by similarity. It's a core component of semantic search and RAG systems. In enterprise AI, it often serves as the memory layer.",
    category: "Infrastructure",
  },
  {
    id: "145",
    term: "Vision Transformer (ViT)",
    definition:
      "A transformer-based model adapted for image understanding. It applies attention to visual tokens instead of pixels. ViTs compete with CNNs and power many modern vision systems.",
    category: "Neural Networks",
  },
  {
    id: "146",
    term: "Watermarking (AI Watermarking)",
    definition:
      "Embedding signals into AI-generated content to indicate it was machine-produced. Watermarking supports authenticity and provenance. The challenge is making it durable and widely adopted.",
    category: "AI Safety",
  },
  {
    id: "147",
    term: "Weight",
    definition:
      "A learned value that determines how strongly one neuron influences another. Weights are adjusted during training to reduce error. Most of a model's learned knowledge lives in its weights.",
    category: "Neural Networks",
  },
  {
    id: "148",
    term: "Workflow Automation",
    definition:
      "Using AI and software systems to run repeatable processes with minimal manual effort. Automation becomes powerful when paired with guardrails and approvals. This is where AI turns into real operational leverage.",
    category: "Automation",
  },
  {
    id: "149",
    term: "XAI (Explainable AI)",
    definition:
      "Techniques that make AI outputs easier for humans to understand. XAI reduces the black-box problem in high-stakes decisions. It supports audits, debugging, and trust.",
    category: "Governance",
  },
  {
    id: "150",
    term: "Zero-Shot Learning",
    definition:
      "A model's ability to handle tasks or categories it wasn't explicitly trained on. This flexibility makes modern models feel adaptable. In practice, it lets AI respond to new requests without custom training.",
    category: "Training Methods",
  },
]

export const dictionaryCategories = [
  "All",
  "Agentic AI",
  "AI Concepts",
  "AI Safety",
  "AI Security",
  "Automation",
  "Data",
  "Deployment",
  "Fundamentals",
  "Generative AI",
  "Governance",
  "Infrastructure",
  "Language Models",
  "Machine Learning",
  "Model Evaluation",
  "Neural Networks",
  "NLP",
  "Products",
  "Prompt Engineering",
  "Training Methods",
  "Use Cases",
]
