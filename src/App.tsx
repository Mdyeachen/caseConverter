import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";

// app init
const App = () => {
  const [text, setText] = useState("");

  // login for handle sentence case
  const handleSentenceCase = () => {
    const converted = text
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
    setText(converted);
  };
  // logic for handle lower case
  const handleLowerCase = () => setText(text.toLowerCase());
  // logic for handle uppercase case
  const handleUpperCase = () => setText(text.toUpperCase());
  // logic for handle Capitalize case

  // logic for handle Capitalize case (preserves line breaks)
  const handlerCapitalizeCase = () => {
    const converted = text
      .toLowerCase()
      .split("\n") // Split by line first
      .map((line) =>
        line
          .split(" ") // Split each line by spaces
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      )
      .join("\n"); // Join back with newlines

    setText(converted);
  };

  // logig for clear textarea
  const handlerClear = () => setText("");
  // logic for copy text
  const handlerCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // logic for character Count
  const charCount = text.length;
  // logic for word count
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  // logic for duplicate words
  const duplicateWords = useMemo(() => {
    if (!text.trim()) return [];

    // 1. Clean the text: lowercase and remove punctuation
    const words = text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 0);

    // 2. Count frequencies
    const freqMap: Record<string, number> = {};
    words.forEach((word) => {
      freqMap[word] = (freqMap[word] || 0) + 1;
    });

    // 3. Convert to array, sort by highest count, and filter only duplicates
    return Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1]) // Show most frequent first
      .filter(([_, count]) => count > 1);
  }, [text]);

  // schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Yeachen Case Converter",
    operatingSystem: "Any",
    applicationCategory: "UtilitiesApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "A powerful online tool to convert text to Sentence case, Uppercase, Lowercase, and find duplicate words.",
    author: {
      "@type": "Person",
      name: "Yeachen Abir",
    },
  };

  return (
    <>
      <Helmet>
        <title>Online Case Converter | Convert Text to Any Format</title>
        <meta
          name="description"
          content="Free online text tool to convert your text to Uppercase, Lowercase, Sentence case, and Capitalized case. Check word count and duplicate words instantly."
        />
        <meta
          name="keywords"
          content="case converter, sentence case, uppercase, lowercase, duplicate word finder, word counter, yeachen tools"
        />
        <meta name="author" content="Yeachen Abir" />
        <meta
          property="og:title"
          content="Case Converter - Best Online Text Tool"
        />
        <meta
          property="og:description"
          content="Quickly change text case and find duplicate words with our simple online tool. Create by Yeachen Abir"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Mdyeachen/caseConverter/refs/heads/main/public/favicon.png"
        />

        <script type="application/ld+json">
          {JSON.stringify(softwareSchema)}
        </script>
      </Helmet>
      <div className="bg-slate-200 min-h-screen w-full mx-auto flex flex-col items-center justify-start p-6 gap-6 font-sans">
        {/* Header Section */}
        <div className="w-full max-w-3xl mx-auto py-6 px-4">
          <img
            className="h-20 mx-auto"
            src="https://raw.githubusercontent.com/Mdyeachen/caseConverter/refs/heads/main/public/favicon.png"
            alt="Case Converter - SEO Tools by Yeachen Abir"
          />
        </div>

        <div className="w-full flex gap-6 justify-center items-start flex-col md:flex-row">
          {/* Main Content */}
          <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
            <h1 className="text-3xl font-black text-slate-800 uppercase mb-2 text-center tracking-tight">
              Case <span className="text-amber-500">Converter</span>
            </h1>
            <p className="text-slate-600 text-sm italic mb-6 text-center">
              Convert your text to any case format you need.
            </p>

            {/* textarea */}
            <textarea
              className="w-full h-[35vh] border-2 border-slate-200 p-5 rounded-xl shadow-inner focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all resize-none text-slate-700 leading-relaxed"
              placeholder="Type or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            {/* state bar */}
            <div className="flex justify-between px-4 py-3 bg-slate-50 rounded-xl border-x border-b border-slate-200 text-xs font-mono uppercase text-slate-500 mt-2">
              <span>
                Characters: <b className="text-slate-800">{charCount}</b>
              </span>
              <span>
                Words: <b className="text-slate-800">{wordCount}</b>
              </span>
            </div>

            {/* button */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
              <button onClick={handleSentenceCase} className="btn-case">
                Sentence case
              </button>
              <button onClick={handleLowerCase} className="btn-case">
                lower case
              </button>
              <button onClick={handleUpperCase} className="btn-case">
                UPPER CASE
              </button>
              <button onClick={handlerCapitalizeCase} className="btn-case">
                Capitalize Word
              </button>
            </div>

            {/* copy and clear textarea */}
            <div className="flex gap-3 mt-4 border-t pt-4 border-slate-100">
              <button
                onClick={handlerCopy}
                className="flex-1 bg-slate-800 text-white py-2.5 rounded-lg font-semibold hover:bg-slate-700 transition-all active:scale-95 shadow-md"
              >
                Copy Text
              </button>
              <button
                onClick={handlerClear}
                className="flex-1 border-2 border-slate-200 text-slate-500 py-2.5 rounded-lg font-semibold hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all active:scale-95"
              >
                Clear
              </button>
            </div>
          </div>

          {/* // dublicate words sections */}
          <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
            <h1 className="text-xl font-black text-slate-800 uppercase mb-2 text-center tracking-tight">
              <span className="text-amber-500">Duplicate</span> Words
            </h1>
            {duplicateWords.length > 0 ? (
              <div className="flex flex-wrap gap-2 py-4">
                {duplicateWords.map(([word, count]) => (
                  <span
                    key={word}
                    className="border border-slate-200 p-2 rounded max-w-full break-all"
                  >
                    <span className="word">{word} </span>
                    <span className="count text-xs p-0.5 bg-amber-500 text-white rounded">
                      {count}
                    </span>
                  </span>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center px-4">
                <svg
                  className="w-12 h-12 mb-3 opacity-20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p className="text-sm italic">
                  No duplicate words detected yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* footer section */}
        <footer className="w-full text-center text-slate-500 text-sm py-6">
          <p>
            © {new Date().getFullYear()} yeachen Case Converter. All rights
            reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;
