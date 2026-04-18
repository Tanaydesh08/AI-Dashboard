import { useState } from 'react';

function showCell(value) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  return String(value);
}

function App() {
  const [file, setFile] = useState(null);
  const [tableRows, setTableRows] = useState([]);
  const [question, setQuestion] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);

  const columns = tableRows.length > 0 ? Object.keys(tableRows[0]) : [];
  const answerRows =
    queryResult && typeof queryResult === 'object' && !Array.isArray(queryResult)
      ? Object.entries(queryResult)
      : [];

  async function uploadFile(event) {
    event.preventDefault();

    if (!file) {
      setError('Please select a CSV file.');
      return;
    }

    setUploading(true);
    setError('');
    setMessage('');
    setQueryResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('CSV upload failed.');
      }

      const uploadInfo = await uploadResponse.json();

      const dataResponse = await fetch('/api/data');
      if (!dataResponse.ok) {
        throw new Error('CSV uploaded, but table data could not be loaded.');
      }

      const data = await dataResponse.json();
      setTableRows(Array.isArray(data) ? data : []);
      setMessage(`${uploadInfo.records} rows uploaded successfully.`);
    } catch (err) {
      setTableRows([]);
      setError(err.message || 'Something went wrong while uploading.');
    } finally {
      setUploading(false);
    }
  }

  async function askAi(event) {
    event.preventDefault();

    const userQuestion = question.trim();
    if (!userQuestion) {
      setError('Please type a question.');
      return;
    }

    setAsking(true);
    setError('');
    setQueryResult(null);

    try {
      const response = await fetch('/api/ai/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: userQuestion,
      });

      if (!response.ok) {
        throw new Error('AI could not answer this question.');
      }

      const result = await response.json();
      setQueryResult(result);
    } catch (err) {
      setError(err.message || 'Could not connect to the AI endpoint.');
    } finally {
      setAsking(false);
    }
  }

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-6 text-stone-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 border-b border-stone-300 pb-4">
          <p className="text-sm font-semibold text-emerald-700">DataSage AI</p>
          <h1 className="mt-1 text-2xl font-semibold">AI Data Analyst Dashboard</h1>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          <section className="space-y-4">
            <form onSubmit={uploadFile} className="rounded border border-stone-300 bg-white p-4">
              <label className="block text-sm font-medium" htmlFor="csvFile">
                Upload your CSV file
              </label>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="csvFile"
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(event) => setFile(event.target.files[0] || null)}
                  className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
                />

                <button
                  type="submit"
                  disabled={uploading}
                  className="rounded bg-emerald-700 px-4 py-2 text-sm font-medium text-white disabled:bg-stone-400"
                >
                  {uploading ? 'Uploading...' : 'Submit'}
                </button>
              </div>

              {message && <p className="mt-3 text-sm text-emerald-700">{message}</p>}
            </form>

            <div className="rounded border border-stone-300 bg-white">
              <div className="border-b border-stone-200 px-4 py-3">
                <h2 className="font-semibold">CSV Data</h2>
              </div>

              {tableRows.length === 0 ? (
                <p className="px-4 py-6 text-sm text-stone-600">Upload a CSV file to view data here.</p>
              ) : (
                <div className="max-h-[520px] overflow-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="sticky top-0 bg-stone-200">
                      <tr>
                        {columns.map((column) => (
                          <th key={column} className="border-b border-stone-300 px-3 py-2">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {tableRows.map((row, index) => (
                        <tr key={index} className="odd:bg-white even:bg-stone-50">
                          {columns.map((column) => (
                            <td key={column} className="border-b border-stone-200 px-3 py-2">
                              {showCell(row[column])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-4">
            <form onSubmit={askAi} className="rounded border border-stone-300 bg-white p-4">
              <label className="block text-sm font-medium" htmlFor="question">
                Ask about the CSV
              </label>

              <textarea
                id="question"
                rows="5"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Example: total salary by department"
                className="mt-3 w-full resize-none rounded border border-stone-300 px-3 py-2 text-sm"
              />

              <button
                type="submit"
                disabled={asking}
                className="mt-3 w-full rounded bg-stone-900 px-4 py-2 text-sm font-medium text-white disabled:bg-stone-400"
              >
                {asking ? 'Asking...' : 'Ask AI'}
              </button>
            </form>

            <div className="rounded border border-stone-300 bg-white">
              <div className="border-b border-stone-200 px-4 py-3">
                <h2 className="font-semibold">Answer</h2>
              </div>

              {answerRows.length === 0 ? (
                <p className="px-4 py-6 text-sm text-stone-600">The answer will appear here.</p>
              ) : (
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-stone-200">
                    <tr>
                      <th className="border-b border-stone-300 px-3 py-2">Group</th>
                      <th className="border-b border-stone-300 px-3 py-2">Value</th>
                    </tr>
                  </thead>

                  <tbody>
                    {answerRows.map(([name, value]) => (
                      <tr key={name}>
                        <td className="border-b border-stone-200 px-3 py-2">{name}</td>
                        <td className="border-b border-stone-200 px-3 py-2">{showCell(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {error && <p className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          </aside>
        </div>
      </div>
    </main>
  );
}

export default App;
