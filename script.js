document.addEventListener("DOMContentLoaded", () => {

    // Current Year
    document.getElementById("current-year").textContent =
        new Date().getFullYear();

    // SUBJECTS

    const commonSubjects = [

        {
            code: "MTH166",
            name: "Differential Equations and Vector Calculus",
            credits: 4,
            components: [
                { name: "Attendance", max: 5, id: "att" },
                { name: "Continuous Assessment", max: 25, id: "ca" },
                { name: "Objective Mid Term", max: 20, id: "mid" },
                { name: "Theory End Term", max: 50, id: "end" }
            ]
        },

        {
            code: "CSE101",
            name: "Computer Programming",
            credits: 4,
            components: [
                { name: "Attendance", max: 5, id: "att" },
                { name: "Continuous Assessment", max: 50, id: "ca" },
                { name: "Practical End Term", max: 45, id: "end" }
            ]
        },

        {
            code: "INT306",
            name: "Database Management Systems",
            credits: 4,
            components: [
                { name: "Attendance", max: 5, id: "att" },
                { name: "Continuous Assessment", max: 50, id: "ca" },
                { name: "Practical End Term", max: 45, id: "end" }
            ]
        },

        {
            code: "CSE121",
            name: "Orientation to Computing-II",
            credits: 2,
            components: [
                { name: "Attendance", max: 20, id: "att" },
                { name: "Continuous Assessment", max: 50, id: "ca" },
                { name: "Objective End Term", max: 30, id: "end" }
            ]
        },

        {
            code: "CSE320",
            name: "Software Engineering",
            credits: 3,
            components: [
                { name: "Attendance", max: 5, id: "att" },
                { name: "Continuous Assessment", max: 25, id: "ca" },
                { name: "Objective Mid Term", max: 20, id: "mid" },
                { name: "Objective End Term", max: 50, id: "end" }
            ]
        },

        {
            code: "PEL",
            name: "Communication Skills",
            credits: 3,
            components: [
                { name: "Attendance", max: 15, id: "att" },
                { name: "Continuous Assessment", max: 30, id: "ca" },
                { name: "Objective Mid Term", max: 15, id: "mid" },
                { name: "Objective End Term", max: 40, id: "end" }
            ]
        }
    ];

    const physicsCycle = [

        {
            code: "PHY110",
            name: "Engineering Physics",
            credits: 3,
            components: [
                { name: "Attendance", max: 5, id: "att" },
                { name: "Continuous Assessment", max: 25, id: "ca" },
                { name: "Objective Mid Term", max: 20, id: "mid" },
                { name: "Objective End Term", max: 50, id: "end" }
            ]
        },

        {
            code: "MEC136",
            name: "Engineering Drawing with AutoCAD",
            credits: 4,
            components: [
                { name: "Attendance", max: 5, id: "att" },
                { name: "Continuous Assessment", max: 25, id: "ca" },
                { name: "Theory Mid Term", max: 20, id: "mid" },
                { name: "Theory End Term", max: 50, id: "end" }
            ]
        }
    ];

    const mechanicalCycle = [

        {
            code: "ECE249",
            name: "Basic Electrical and Electronics Engineering",
            credits: 3,
            components: [
                { name: "Attendance", max: 5, id: "att" },
                { name: "Continuous Assessment", max: 25, id: "ca" },
                { name: "Objective Mid Term", max: 20, id: "mid" },
                { name: "Objective End Term", max: 15, id: "objend" },
                { name: "Theory End Term", max: 35, id: "thend" }
            ]
        },

        {
            code: "ECE279",
            name: "Basic Electrical and Electronics Engineering Laboratory",
            credits: 1,
            components: [
                { name: "Attendance", max: 5, id: "att" },
                { name: "Continuous Assessment", max: 45, id: "ca" },
                { name: "Practical End Term", max: 50, id: "end" }
            ]
        },

        {
            code: "CHE110",
            name: "Environmental Studies",
            credits: 2,
            components: [
                { name: "Attendance", max: 5, id: "att" },
                { name: "Continuous Assessment", max: 40, id: "ca" },
                { name: "Objective Mid Term", max: 20, id: "mid" },
                { name: "Objective End Term", max: 35, id: "end" }
            ]
        }
    ];

    // STATE

    const cycleToggle =
        document.getElementById("cycle-toggle");

    const labelPhysics =
        document.getElementById("label-physics");

    const labelMechanical =
        document.getElementById("label-mechanical");

    const subjectsContainer =
        document.getElementById("subjects-container");

    const elTotalCredits =
        document.getElementById("total-credits");

    const elTotalMarks =
        document.getElementById("total-marks");

    const elSgpaValue =
        document.getElementById("sgpa-value");

    const elSgpaCircle =
        document.getElementById("sgpa-circle");

    const elCgpaValue =
        document.getElementById("cgpa-value");

    const elCgpaBar =
        document.getElementById("cgpa-bar");

    const elGradeList =
        document.getElementById("grade-list");

    let currentSubjects = [];

    let savedData =
        JSON.parse(localStorage.getItem("cgpa_data")) || {};

    // INIT

    function init() {
        if (!cycleToggle) return;

        const savedCycle =
            localStorage.getItem("selected_cycle") || "physics";

        if (savedCycle === "mechanical") {
            cycleToggle.checked = true;
        }

        updateCycleSelection();
    }

    if (cycleToggle) {
        cycleToggle.addEventListener(
            "change",
            updateCycleSelection
        );
    }

    function updateCycleSelection() {

        const isMechanical = cycleToggle.checked;

        if (isMechanical) {

            labelMechanical.classList.add("active");
            labelPhysics.classList.remove("active");

            currentSubjects = [
                ...commonSubjects,
                ...mechanicalCycle
            ];

            localStorage.setItem(
                "selected_cycle",
                "mechanical"
            );

        } else {

            labelPhysics.classList.add("active");
            labelMechanical.classList.remove("active");

            currentSubjects = [
                ...commonSubjects,
                ...physicsCycle
            ];

            localStorage.setItem(
                "selected_cycle",
                "physics"
            );
        }

        renderSubjects();
        calculateAll();
    }

    // RENDER

    function renderSubjects() {

        subjectsContainer.innerHTML = "";

        currentSubjects.forEach((sub) => {

            const maxTotal =
                sub.components.reduce(
                    (sum, c) => sum + c.max,
                    0
                );

            const card = document.createElement("div");

            card.className = "subject-card";

            let componentsHtml = "";

            sub.components.forEach(comp => {

                const inputId =
                    `${sub.code}_${comp.id}`;

                const val =
                    savedData[inputId] !== undefined
                        ? savedData[inputId]
                        : "";

                componentsHtml += `
                    <div class="input-group">
                        <label>${comp.name}</label>
                        <div class="input-wrapper">
                            <input
                                type="number"
                                id="${inputId}"
                                data-max="${comp.max}"
                                value="${val}"
                                min="0"
                                max="${comp.max}"
                            >
                            <span class="input-max">/ ${comp.max}</span>
                        </div>
                    </div>
                `;
            });

            card.innerHTML = `
                <div class="subject-header">
                    <div>
                        <h3>${sub.code}</h3>
                        <p>${sub.name}</p>
                    </div>

                    <div id="grade_${sub.code}">
                        --
                    </div>
                </div>

                <div class="components-grid">
                    ${componentsHtml}
                </div>

                <div class="subject-footer">

                    <div class="progress-container">
                        <div class="progress-bar"
                             id="bar_${sub.code}">
                        </div>
                    </div>

                    <div id="total_${sub.code}">
                        0 / ${maxTotal}
                    </div>

                </div>
            `;

            subjectsContainer.appendChild(card);
        });

        document
            .querySelectorAll(".subject-card input")
            .forEach(input => {

                input.addEventListener("input", (e) => {

                    let val =
                        parseFloat(e.target.value);

                    const max =
                        parseFloat(
                            e.target.getAttribute("data-max")
                        );

                    if (val > max) {
                        e.target.value = max;
                    }

                    if (val < 0) {
                        e.target.value = 0;
                    }

                    savedData[e.target.id] =
                        e.target.value;

                    localStorage.setItem(
                        "cgpa_data",
                        JSON.stringify(savedData)
                    );

                    calculateAll();
                });
            });
    }

    // GRADE LOGIC

    function getGradePoints(p) {

        if (p >= 90) return { grade: "O", points: 10 };
        if (p >= 80) return { grade: "A+", points: 9 };
        if (p >= 70) return { grade: "A", points: 8 };
        if (p >= 60) return { grade: "B+", points: 7 };
        if (p >= 50) return { grade: "B", points: 6 };
        if (p >= 40) return { grade: "C", points: 5 };

        return { grade: "F", points: 0 };
    }

    // CALCULATE

    function calculateAll() {

        let totalCredits = 0;
        let totalWeightedPoints = 0;
        let totalMarksEarned = 0;

        let gradeCounts = {
            O: 0,
            "A+": 0,
            A: 0,
            "B+": 0,
            B: 0,
            C: 0,
            F: 0
        };

        currentSubjects.forEach(sub => {

            let subTotal = 0;
            let subMax = 0;

            sub.components.forEach(comp => {

                subMax += comp.max;

                const inputId =
                    `${sub.code}_${comp.id}`;

                const val =
                    parseFloat(savedData[inputId]) || 0;

                subTotal += val;
            });

            totalMarksEarned += subTotal;
            totalCredits += sub.credits;

            const percentage =
                (subTotal / subMax) * 100;

            const { grade, points } =
                getGradePoints(percentage);

            document.getElementById(
                `total_${sub.code}`
            ).textContent =
                `${subTotal.toFixed(1)} / ${subMax}`;

            document.getElementById(
                `bar_${sub.code}`
            ).style.width =
                `${percentage}%`;

            document.getElementById(
                `grade_${sub.code}`
            ).textContent =
                grade;

            gradeCounts[grade]++;

            totalWeightedPoints +=
                points * sub.credits;
        });

        const sgpa =
            totalCredits > 0
                ? (
                    totalWeightedPoints /
                    totalCredits
                ).toFixed(2)
                : "0.00";

        elTotalCredits.textContent =
            totalCredits;

        elTotalMarks.textContent =
            totalMarksEarned.toFixed(1);

        elSgpaValue.textContent = sgpa;

        elCgpaValue.textContent = sgpa;

        elCgpaBar.style.width =
            `${(sgpa / 10) * 100}%`;

        const dashArray =
            (sgpa / 10) * 100;

        elSgpaCircle.setAttribute(
            "stroke-dasharray",
            `${dashArray}, 100`
        );

        elGradeList.innerHTML = "";

        Object.entries(gradeCounts)
            .forEach(([grade, count]) => {

                if (count > 0) {

                    const li =
                        document.createElement("li");

                    li.innerHTML = `
                        <span>${grade}</span>
                        <span>${count}</span>
                    `;

                    elGradeList.appendChild(li);
                }
            });
    }

    // RESET

    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {

            savedData = {};

            localStorage.removeItem("cgpa_data");

            document
                .querySelectorAll("input")
                .forEach(input => {
                    input.value = "";
                });

            calculateAll();
        });
    }

    // PDF EXPORT

    const exportPdfBtn = document.getElementById("export-pdf-btn");
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener("click", () => {

            const { jsPDF } = window.jspdf;

            const doc =
                new jsPDF("p", "mm", "a4");

            const btn =
                document.getElementById(
                    "export-pdf-btn"
                );

            const originalText =
                btn.innerHTML;

            btn.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Generating...';

            btn.disabled = true;

            try {

                let y = 20;

                // HEADER

                doc.setFillColor(47, 133, 90);

                doc.rect(
                    0,
                    0,
                    210,
                    35,
                    "F"
                );

                doc.setTextColor(
                    255,
                    255,
                    255
                );

                doc.setFontSize(22);

                doc.setFont(
                    "helvetica",
                    "bold"
                );

                doc.text(
                    "LPU Semester Academic Report",
                    14,
                    18
                );

                doc.setFontSize(11);

                doc.setFont(
                    "helvetica",
                    "normal"
                );

                doc.text(
                    "Generated by CGPA Calculator • Created by Sagnik Chakraborty",
                    14,
                    27
                );

                y = 45;

                // SUBJECTS

                currentSubjects.forEach(sub => {

                    let subTotal = 0;
                    let subMax = 0;

                    sub.components.forEach(comp => {

                        const inputId =
                            `${sub.code}_${comp.id}`;

                        const val =
                            parseFloat(
                                savedData[inputId]
                            ) || 0;

                        subTotal += val;
                        subMax += comp.max;
                    });

                    const percentage =
                        (subTotal / subMax) * 100;

                    const { grade } =
                        getGradePoints(
                            percentage
                        );

                    if (y > 240) {
                        doc.addPage();
                        y = 20;
                    }

                    doc.setFillColor(
                        245,
                        245,
                        245
                    );

                    doc.roundedRect(
                        12,
                        y - 5,
                        186,
                        40,
                        3,
                        3,
                        "F"
                    );

                    doc.setTextColor(
                        0,
                        0,
                        0
                    );

                    doc.setFont(
                        "helvetica",
                        "bold"
                    );

                    doc.setFontSize(13);

                    doc.text(
                        `${sub.code} - ${sub.name}`,
                        18,
                        y + 2
                    );

                    doc.setFontSize(10);

                    doc.text(
                        `Credits: ${sub.credits} | Grade: ${grade}`,
                        18,
                        y + 8
                    );

                    y += 16;

                    doc.setFont(
                        "helvetica",
                        "normal"
                    );

                    sub.components.forEach(comp => {

                        const inputId =
                            `${sub.code}_${comp.id}`;

                        const val =
                            parseFloat(
                                savedData[inputId]
                            ) || 0;

                        doc.text(
                            `${comp.name}`,
                            20,
                            y
                        );

                        doc.text(
                            `${val} / ${comp.max}`,
                            150,
                            y
                        );

                        y += 5;
                    });

                    doc.setFont(
                        "helvetica",
                        "bold"
                    );

                    doc.text(
                        `Total: ${subTotal.toFixed(1)} / ${subMax}`,
                        20,
                        y + 2
                    );

                    y += 12;
                });

                // SUMMARY

                if (y > 240) {

                    doc.addPage();

                    y = 20;
                }

                const totalCredits =
                    document.getElementById(
                        "total-credits"
                    ).textContent;

                const totalMarks =
                    document.getElementById(
                        "total-marks"
                    ).textContent;

                const sgpa =
                    document.getElementById(
                        "sgpa-value"
                    ).textContent;

                doc.setFillColor(
                    47,
                    133,
                    90
                );

                doc.roundedRect(
                    12,
                    y,
                    186,
                    40,
                    4,
                    4,
                    "F"
                );

                doc.setTextColor(
                    255,
                    255,
                    255
                );

                doc.setFontSize(18);

                doc.setFont(
                    "helvetica",
                    "bold"
                );

                doc.text(
                    "Academic Summary",
                    18,
                    y + 10
                );

                doc.setFontSize(12);

                doc.setFont(
                    "helvetica",
                    "normal"
                );

                doc.text(
                    `Total Credits : ${totalCredits}`,
                    18,
                    y + 22
                );

                doc.text(
                    `Total Marks : ${totalMarks}`,
                    18,
                    y + 30
                );

                doc.text(
                    `Expected SGPA : ${sgpa}`,
                    110,
                    y + 22
                ); 

                // FOOTER

                doc.setTextColor(
                    120,
                    120,
                    120
                );

                doc.setFontSize(9);

                doc.text(
                    `Generated on ${new Date().toLocaleString()}`,
                    14,
                    290
                );

                // SAVE PDF

                doc.save(
                    "LPU_Semester_Report.pdf"
                );

            } catch (e) {

                console.error(e);

                alert(
                    "Failed to generate PDF"
                );

            } finally {

                btn.innerHTML =
                    originalText;

                btn.disabled = false;
            }
        });
    }

    // BACK TO HOME LOADING LOGIC
    const backHomeLinks = document.querySelectorAll(".back-home-link");
    const pageLoader = document.getElementById("page-loader");

    if (backHomeLinks.length > 0 && pageLoader) {
        backHomeLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                pageLoader.classList.remove("hidden");
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 1000);
            });
        });
    }

    // RUN

    init();
});