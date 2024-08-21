const gradePoints = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C+': 5,
    'C': 4,
    'U': 0
};

// Define subjects for each semester
const subjectsBySemester = {
    1: [
        { name: 'Communication English', credits: 2 },
        { name: 'Matrices, Differential and Integral Calculus', credits: 4 },
        { name: 'Engineering Chemistry', credits: 3 },
        { name: 'Programming For Problem Solving in C', credits: 3 },
        { name: 'Engineering Graphics', credits: 4 },
        { name: 'Communicative English Laboratory', credits: 1 },
        { name: 'Chemistry Laboratory', credits: 1 },
        { name: 'C Programming Laboratory', credits: 2 }
    ],
    2: [
        { name: 'Vector Calculus and Complex Functions', credits: 4 },
        { name: 'Engineering Physics', credits: 3 },
        { name: 'Programming For Problem Solving Using Python', credits: 4 },
        { name: 'Basic Electrical Electronics and Communication Engineering', credits: 3 },
        { name: 'Introduction to Information and Computing Technology', credits: 3 },
        { name: 'Constitution Of India', credits: 0 },
        { name: 'Physics Laboratory', credits: 1 },
        { name: 'Workshop Practice', credits: 2 },
        { name: 'Basic Electrical, Electronics and Communication Engineering Laboratory', credits: 1 },
        { name: 'Quantitative Aptitude and Verbal Reasoning', credits: 1 }
    ],
    3: [
        { name: 'Object Oriented Programming', credits: 3 },
        { name: 'Computer Architecture', credits: 3 },
        { name: 'Data Structures', credits: 3 },
        { name: 'Digital Logic Circuit', credits: 4 },
        { name: 'Discrete Mathematics', credits: 4 },
        { name: 'Fundamentals of Nano Science', credits: 0 },
        { name: 'Heritage of Tamils', credits: 1 },
        { name: 'Object Oriented Programming Laboratory', credits: 1 },
        { name: 'Data Structures Laboratory', credits: 1 },
        { name: 'Quantitative Aptitude and Behavioural Skills', credits: 1 }
    ],
    4: [
        { name: 'Environmental Science and Engineering', credits: 0 },
        { name: 'Operating Systems', credits: 3 },
        { name: 'Design and Analysis of Algorithms', credits: 4 },
        { name: 'Operating System Laboratory', credits: 1 },
        { name: 'Object Oriented Software Engineering', credits: 3 },
        { name: 'Database Management Systems', credits: 3 },
        { name: 'Java Programming', credits: 3 },
        { name: 'Database Management Systems Laboratory', credits: 1 },
        { name: 'Java Programming Laboratory', credits: 1 },
        { name: 'Probability and Statistics', credits: 4 },
        { name: 'Quantitative Aptitude and Communication Skills', credits: 1 },
        { name: 'Tamils and Technology', credits: 1 }
    ],
    5: [
        { name: 'Web Technologies', credits: 3 },
        { name: 'Data Communication Network', credits: 3 },
        { name: 'Software Quality Assurance', credits: 3 },
        { name: 'Professional Ethics', credits: 3 },
        { name: 'Compiler Engineering', credits: 3 },
        { name: 'Web Technology Lab', credits: 3 },
        { name: 'Data Communication Lab', credits: 3 },
        { name: 'Quantitative Aptitude and Reasoning', credits: 3 }
    ],
    6: [
        { name: 'Computational Intelligence', credits: 3 },
        { name: 'Big Data Analytics', credits: 3 },
        { name: 'Mobile Communication', credits: 3 },
        { name: 'Information Security', credits: 3 },
        { name: 'Software Project Management', credits: 3 },
        { name: 'Energy Conservation and Management', credits: 3 },
        { name: 'Mobile Application Development Lab', credits: 3 },
        { name: 'Mini Project', credits: 3 }
    ],
    7: [
        { name: 'Cryptography and Network Security', credits: 3 },
        { name: 'Blockchain Technologies', credits: 4 },
        { name: 'Cloud Computing and Virtualization', credits: 3 },
        { name: 'Professional Elective', credits: 3 },
        { name: 'Professional Elective', credits: 3 },
        { name: 'Open Elective', credits: 3 },
        { name: 'Advanced Computing Lab', credits: 2 },
        { name: 'Security Lab', credits: 2 }
    ],
    8: [
        { name: 'Professional Elective', credits: 3 },
        { name: 'Professional Elective', credits: 3 },
        { name: 'Project Work', credits: 6 }
    ]
};

// Function to generate subjects based on the selected semester
function generateSubjects() {
    const semester = document.getElementById('semester').value;
    const container = document.getElementById('subjects-container');
    container.innerHTML = ''; // Clear previous subjects

    const subjects = subjectsBySemester[semester] || [];

    subjects.forEach((subject, index) => {
        const newSubjectDiv = document.createElement('div');
        newSubjectDiv.classList.add('subject');
        newSubjectDiv.innerHTML = `
            <label for="grade${index + 1}">${subject.name} Grade:</label>
            <select id="grade${index + 1}" class="grade">
                <option value="O">O</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="U">U</option>
            </select>
            <label for="credit${index + 1}">Credits:</label>
            <input type="number" id="credit${index + 1}" class="credit" step="0.01" min="0" value="${subject.credits}" readonly>
        `;
        container.appendChild(newSubjectDiv);
    });
}

// Function to calculate GPA for a specific semester
function calculateGPA(semester) {
    let totalPoints = 0;
    let totalCredits = 0;

    const subjects = subjectsBySemester[semester] || [];

    subjects.forEach((subject, index) => {
        const grade = document.getElementById(`grade${index + 1}`).value;
        const credit = parseFloat(document.getElementById(`credit${index + 1}`).value);

        if (gradePoints.hasOwnProperty(grade) && !isNaN(credit) && credit > 0) {
            totalPoints += gradePoints[grade] * credit;
            totalCredits += credit;
        }
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
  document.getElementById('gpa-value').textContent = gpa;
    return { gpa, totalCredits };
}

// Function to calculate CGPA from GPA and credits
function calculateCGPA() {
    let cumulativePoints = 0;
    let cumulativeCredits = 0;

    // Iterate over each semester up to the selected one
    for (let semester = 1; semester <= parseInt(document.getElementById('semester').value); semester++) {
        const { gpa, totalCredits } = calculateGPA(semester);
        cumulativePoints += gpa * totalCredits;
        cumulativeCredits += totalCredits;
    }

    const cgpa = cumulativeCredits > 0 ? (cumulativePoints / cumulativeCredits).toFixed(2) : 0;
    document.getElementById('cgpa-value').textContent = cgpa;
}

// Event listener for semester change to generate subjects and update GPA and CGPA
document.getElementById('semester').addEventListener('change', () => {
    generateSubjects();
    calculateGPA(parseInt(document.getElementById('semester').value));
    calculateCGPA();  // Update CGPA whenever the semester is changed
});

// Generate subjects for the default selected semester on page load
window.onload = () => {
    generateSubjects();
    calculateGPA(parseInt(document.getElementById('semester').value));
    calculateCGPA();  // Calculate initial CGPA on page load
}
