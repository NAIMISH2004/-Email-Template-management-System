import { useEffect, useState } from "react";
import "./App.css";

import TemplateForm from "./components/TemplateForm";
import Preview from "./components/Preview";
import API from "./services/api";

function App() {
  const [templates, setTemplates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editData, setEditData] = useState(null);

  const loadTemplates = async () => {
    try {
      const res = await API.get("/");
      setTemplates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const deleteTemplate = async (id) => {
    if (!window.confirm("Delete this template?")) return;

    try {
      await API.delete(`/${id}`);

      if (id === selectedId) setSelectedId(null);

      loadTemplates();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const startEdit = (template) => {
    setEditData({
      id: template._id,
      name: template.name,
      subject: template.currentVersion.subject,
      body: template.currentVersion.body
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-container">

      <h1 className="app-title">
        Email Template Manager
      </h1>

      {/* Form */}
      <div className="card">
        <TemplateForm
          onSaved={loadTemplates}
          editData={editData}
          clearEdit={() => setEditData(null)}
        />
      </div>

      {/* List */}
      <div className="card">

        <h2 className="section-title">
          Saved Templates
        </h2>

        {templates.length === 0 && <p>No templates yet</p>}

        <ul className="template-list">
          {templates.map((t) => (
            <li
              key={t._id}
              className="template-item"
            >
              <span>{t.name}</span>

              <div className="btn-group">
                <button
                  onClick={() => setSelectedId(t._id)}
                >
                  Preview
                </button>

                <button
                  className="btn-secondary"
                  onClick={() => startEdit(t)}
                >
                  Edit
                </button>

                <button
                  className="btn-danger"
                  onClick={() => deleteTemplate(t._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Preview */}
      {selectedId && (
        <div className="card">

          <h2 className="section-title">
            Preview
          </h2>

          <Preview id={selectedId} />
        </div>
      )}

    </div>
  );
}

export default App;
