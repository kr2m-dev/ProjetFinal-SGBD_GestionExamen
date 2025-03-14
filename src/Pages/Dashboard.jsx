import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { getExams } from '../services/examService';

function Dashboard() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const data = await getExams();
      setExams(data);
    };
    fetchExams();
  }, []);

  return (
    <div className="dashboard">
      <h1>Tableau de bord</h1>
      <Link to="/create-exam" className="button">Créer un examen</Link>
      <div className="exams-list">
        {exams.map(exam => (
          <div key={exam.id} className="exam-card">
            <h3>{exam.title}</h3>
            <p>{exam.description}</p>
            <div className="actions">
              <Link to={`/take-exam/${exam.id}`}>Passer l'examen</Link>
              <Link to={`/review-exam/${exam.id}`}>Revoir l'examen</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;