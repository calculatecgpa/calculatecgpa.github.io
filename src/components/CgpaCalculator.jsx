import React, { useState, useMemo, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Copy,
  Check,
  Printer,
  Sparkles,
  RotateCcw,
  Sliders,
  BookOpen,
  GraduationCap,
  ChevronDown,
  Layers,
  TrendingUp,
} from 'lucide-react';
import GradeScaleModal, { DEFAULT_4_SCALE } from './GradeScaleModal.jsx';

// Initial Starter Data
const createNewCourse = (id, name = '', credits = 3, grade = 'A') => ({
  id: id || `course_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
  name,
  credits,
  grade,
});

const createInitialSemester = () => [
  {
    id: `sem_${Date.now()}_1`,
    name: 'Semester 1',
    courses: [
      createNewCourse(null, 'Introduction to Computer Science', 4, 'A'),
      createNewCourse(null, 'Calculus & Analytical Geometry', 4, 'A-'),
      createNewCourse(null, 'Physics for Engineers', 4, 'B+'),
      createNewCourse(null, 'Academic Writing & Communication', 3, 'A'),
    ],
  },
];

const generateExampleSemesters = () => [
  {
    id: `sem_${Date.now()}_1`,
    name: 'Semester 1 (Fall)',
    courses: [
      createNewCourse(null, 'Introduction to Computer Science', 4, 'A'),
      createNewCourse(null, 'Calculus I: Single Variable', 4, 'A-'),
      createNewCourse(null, 'Physics Mechanics & Lab', 4, 'B+'),
      createNewCourse(null, 'Academic Writing & Research', 3, 'A'),
    ],
  },
  {
    id: `sem_${Date.now()}_2`,
    name: 'Semester 2 (Spring)',
    courses: [
      createNewCourse(null, 'Data Structures & Algorithms', 4, 'A'),
      createNewCourse(null, 'Linear Algebra & Matrices', 3, 'B+'),
      createNewCourse(null, 'Digital Logic & Computer Design', 4, 'A'),
      createNewCourse(null, 'Technical Communication', 3, 'A-'),
      createNewCourse(null, 'Discrete Mathematics', 3, 'A'),
    ],
  },
  {
    id: `sem_${Date.now()}_3`,
    name: 'Semester 3 (Fall)',
    courses: [
      createNewCourse(null, 'Database Management Systems', 4, 'A'),
      createNewCourse(null, 'Object-Oriented Programming', 4, 'A'),
      createNewCourse(null, 'Computer Organization & Architecture', 3, 'B+'),
      createNewCourse(null, 'Probability & Statistics', 3, 'A-'),
    ],
  },
];

export default function CgpaCalculator() {
  const [semesters, setSemesters] = useState(createInitialSemester);
  const [gradeScale, setGradeScale] = useState(DEFAULT_4_SCALE);
  const [maxScale, setMaxScale] = useState(4.0);
  const [isScaleModalOpen, setIsScaleModalOpen] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Grade point lookup dictionary for O(1) performance
  const gradePointsMap = useMemo(() => {
    const map = new Map();
    gradeScale.forEach((item) => {
      map.set(item.grade.toUpperCase(), parseFloat(item.points));
    });
    return map;
  }, [gradeScale]);

  // Real-time calculation engine
  const calculationResults = useMemo(() => {
    let grandTotalCredits = 0;
    let grandTotalQualityPoints = 0;
    let totalCoursesCount = 0;

    const semesterBreakdowns = semesters.map((sem) => {
      let semCredits = 0;
      let semQualityPoints = 0;
      let semValidCourses = 0;

      const courseDetails = sem.courses.map((course) => {
        const cred = parseFloat(course.credits);
        const validCred = !isNaN(cred) && cred > 0 ? cred : 0;
        const pts = gradePointsMap.has(course.grade?.toUpperCase())
          ? gradePointsMap.get(course.grade?.toUpperCase())
          : 0;

        const qualityPoints = validCred * pts;

        if (validCred > 0 && course.grade) {
          semCredits += validCred;
          semQualityPoints += qualityPoints;
          semValidCourses += 1;
        }

        return {
          ...course,
          numericCredits: validCred,
          gradePointValue: pts,
          qualityPoints: qualityPoints,
        };
      });

      const sgpa = semCredits > 0 ? semQualityPoints / semCredits : 0;

      grandTotalCredits += semCredits;
      grandTotalQualityPoints += semQualityPoints;
      totalCoursesCount += semValidCourses;

      return {
        semesterId: sem.id,
        semesterName: sem.name,
        totalCredits: semCredits,
        qualityPoints: semQualityPoints,
        sgpa: parseFloat(sgpa.toFixed(2)),
        preciseSgpa: sgpa,
        courses: courseDetails,
      };
    });

    const cgpa =
      grandTotalCredits > 0 ? grandTotalQualityPoints / grandTotalCredits : 0;

    // Academic Classification Calculation
    const percentage = maxScale > 0 ? (cgpa / maxScale) * 100 : 0;
    let standing = {
      label: 'Good Standing',
      badgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    };

    if (percentage >= 92.5) {
      standing = {
        label: 'Summa Cum Laude / First Class with Distinction',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    } else if (percentage >= 85.0) {
      standing = {
        label: 'Magna Cum Laude / First Class Honors',
        badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
      };
    } else if (percentage >= 75.0) {
      standing = {
        label: 'Cum Laude / Upper Second Class',
        badgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      };
    } else if (percentage >= 60.0) {
      standing = {
        label: 'Second Class / Satisfactory',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    } else if (cgpa > 0) {
      standing = {
        label: 'Passing / Academic Notice',
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      };
    }

    return {
      cgpa: parseFloat(cgpa.toFixed(2)),
      preciseCgpa: cgpa,
      totalCredits: grandTotalCredits,
      totalQualityPoints: grandTotalQualityPoints,
      totalCoursesCount,
      percentage: Math.min(100, Math.max(0, percentage)),
      standing,
      semesterBreakdowns,
    };
  }, [semesters, gradePointsMap, maxScale]);

  // Semester Management
  const handleAddSemester = () => {
    const nextNumber = semesters.length + 1;
    const newSem = {
      id: `sem_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: `Semester ${nextNumber}`,
      courses: [
        createNewCourse(null, '', 3, 'A'),
        createNewCourse(null, '', 3, 'A'),
        createNewCourse(null, '', 3, 'B+'),
      ],
    };
    setSemesters((prev) => [...prev, newSem]);
  };

  const handleDeleteSemester = (semId) => {
    if (semesters.length <= 1) {
      setSemesters([
        {
          id: `sem_${Date.now()}_1`,
          name: 'Semester 1',
          courses: [createNewCourse(null, '', 3, 'A')],
        },
      ]);
      return;
    }
    setSemesters((prev) => prev.filter((s) => s.id !== semId));
  };

  const handleSemesterNameChange = (semId, newName) => {
    setSemesters((prev) =>
      prev.map((s) => (s.id === semId ? { ...s, name: newName } : s))
    );
  };

  // Course Management
  const handleAddCourse = (semId) => {
    setSemesters((prev) =>
      prev.map((s) => {
        if (s.id === semId) {
          return {
            ...s,
            courses: [...s.courses, createNewCourse(null, '', 3, 'A')],
          };
        }
        return s;
      })
    );
  };

  const handleDeleteCourse = (semId, courseId) => {
    setSemesters((prev) =>
      prev.map((s) => {
        if (s.id === semId) {
          const updatedCourses = s.courses.filter((c) => c.id !== courseId);
          return {
            ...s,
            courses:
              updatedCourses.length > 0
                ? updatedCourses
                : [createNewCourse(null, '', 3, 'A')],
          };
        }
        return s;
      })
    );
  };

  const handleCourseChange = (semId, courseId, field, value) => {
    setSemesters((prev) =>
      prev.map((s) => {
        if (s.id === semId) {
          return {
            ...s,
            courses: s.courses.map((c) => {
              if (c.id === courseId) {
                return { ...c, [field]: value };
              }
              return c;
            }),
          };
        }
        return s;
      })
    );
  };

  // Quick Presets and Actions
  const handleLoadExampleData = () => {
    setSemesters(generateExampleSemesters());
  };

  const handleClearAll = () => {
    setSemesters([
      {
        id: `sem_${Date.now()}_1`,
        name: 'Semester 1',
        courses: [
          createNewCourse(null, '', 3, 'A'),
          createNewCourse(null, '', 3, 'A'),
          createNewCourse(null, '', 3, 'B+'),
        ],
      },
    ]);
  };

  // Listen to external triggers
  useEffect(() => {
    const handleOpenScale = () => setIsScaleModalOpen(true);
    const handleLoadExample = () => handleLoadExampleData();
    const handleReset = () => handleClearAll();

    window.addEventListener('open-scale-modal', handleOpenScale);
    window.addEventListener('load-example-data', handleLoadExample);
    window.addEventListener('reset-calculator', handleReset);

    return () => {
      window.removeEventListener('open-scale-modal', handleOpenScale);
      window.removeEventListener('load-example-data', handleLoadExample);
      window.removeEventListener('reset-calculator', handleReset);
    };
  }, []);

  const handleCopySummary = () => {
    let summaryText = `🎓 CalculateCGPA Academic Summary\n`;
    summaryText += `---------------------------------\n`;
    summaryText += `Overall CGPA: ${calculationResults.cgpa.toFixed(2)} / ${maxScale.toFixed(1)}\n`;
    summaryText += `Total Credits Completed: ${calculationResults.totalCredits}\n`;
    summaryText += `Honors Standing: ${calculationResults.standing.label}\n\n`;
    summaryText += `Semester Breakdown:\n`;

    calculationResults.semesterBreakdowns.forEach((sem) => {
      summaryText += `• ${sem.semesterName}: SGPA ${sem.sgpa.toFixed(2)} (${sem.totalCredits} Credits, ${sem.courses.length} Courses)\n`;
    });

    summaryText += `\nCalculated privately on https://calculatecgpa.github.io`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="calculator" className="space-y-6 sm:space-y-8 w-full max-w-full">
      {/* Grade Scale Modal */}
      <GradeScaleModal
        isOpen={isScaleModalOpen}
        onClose={() => setIsScaleModalOpen(false)}
        gradeScale={gradeScale}
        onSaveGradeScale={setGradeScale}
        maxScale={maxScale}
        onSaveMaxScale={setMaxScale}
      />

      {/* TOP STATS DASHBOARD / HERO CARD */}
      <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-slate-200/80 relative overflow-hidden transition-all">
        {/* Decorative Cyan Glow #90e0ef */}
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#90e0ef]/25 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#e0f7fc] border border-[#90e0ef] text-[#0077b6] text-[11px] sm:text-xs font-bold mb-2 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#0096c7]" />
              <span>Real-Time GPA Engine • {maxScale.toFixed(1)} Scale</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Semester & Cumulative GPA Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Add your semesters, courses, credit hours, and expected grades. Calculations update dynamically with 100% client-side precision.
            </p>
          </div>

          {/* Quick Toolbar */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full lg:w-auto pt-1 sm:pt-0">
            <button
              type="button"
              onClick={handleLoadExampleData}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#0077b6] bg-[#e0f7fc] hover:bg-[#b8eff7] border border-[#90e0ef] transition-all active:scale-95 cursor-pointer shadow-2xs"
              title="Populate with realistic sample courses"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0096c7]" />
              <span>Example Data</span>
            </button>

            <button
              type="button"
              onClick={() => setIsScaleModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all active:scale-95 cursor-pointer shadow-2xs"
              title="Change grading scale (4.0, 5.0, 10.0 or custom)"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-600" />
              <span>Grade Scale</span>
            </button>

            <button
              type="button"
              onClick={handleClearAll}
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 sm:border-transparent hover:border-red-200 transition-all cursor-pointer"
              title="Reset all rows"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          </div>
        </div>

        {/* METRICS DISPLAY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5 sm:mt-6">
          {/* Main CGPA Highlight Card with #90e0ef themed background */}
          <div className="sm:col-span-2 bg-gradient-to-br from-[#03045e] via-[#023e8a] to-[#0077b6] rounded-2xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-[#90e0ef]/15 pointer-events-none hidden xs:block">
              <GraduationCap className="w-36 h-36 sm:w-48 sm:h-48" />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#90e0ef] uppercase">
                  Cumulative CGPA
                </span>
                <span className="text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-100 font-mono">
                  Scale: {maxScale.toFixed(1)}
                </span>
              </div>

              <div className="flex items-baseline gap-2 sm:gap-3 mt-2">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-mono">
                  {calculationResults.cgpa.toFixed(2)}
                </span>
                <span className="text-[#90e0ef] text-sm sm:text-lg font-medium">
                  / {maxScale.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Progress Bar & Standing */}
            <div className="mt-4 sm:mt-5 space-y-2 relative z-10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-100 font-medium">Academic Rating</span>
                <span className="font-bold text-white">
                  {calculationResults.percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#90e0ef] via-[#48cae4] to-emerald-300 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${calculationResults.percentage}%` }}
                />
              </div>
              <div className="pt-1">
                <span className="inline-block text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/15 text-cyan-50 border border-white/15 truncate max-w-full">
                  {calculationResults.standing.label}
                </span>
              </div>
            </div>
          </div>

          {/* Total Credits Card */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Credits
              </span>
              <div className="p-1.5 sm:p-2 bg-[#e0f7fc] text-[#0077b6] rounded-xl">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {calculationResults.totalCredits}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 block mt-0.5">
                Completed Hours
              </span>
            </div>
            <div className="text-xs font-medium text-slate-600 border-t border-slate-200/60 pt-2 flex items-center justify-between">
              <span>Total Courses</span>
              <span className="font-bold text-slate-800">
                {calculationResults.totalCoursesCount}
              </span>
            </div>
          </div>

          {/* Quality Points & Export Card */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Quality Points
              </span>
              <div className="p-1.5 sm:p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {calculationResults.totalQualityPoints.toFixed(1)}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 block mt-0.5">
                Earned Points
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 border-t border-slate-200/60 pt-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                title="Copy academic summary to clipboard"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs transition-colors cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEMESTERS LIST & COURSE BUILDER */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#0096c7]" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Semesters & Course Records
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {semesters.length} {semesters.length === 1 ? 'Semester' : 'Semesters'}
          </span>
        </div>

        {semesters.map((sem, sIdx) => {
          const breakdown = calculationResults.semesterBreakdowns.find(
            (b) => b.semesterId === sem.id
          );

          return (
            <div
              key={sem.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Semester Header Card */}
              <div className="p-3.5 sm:p-5 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-[180px]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-[#0096c7] to-[#03045e] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                    {sIdx + 1}
                  </div>
                  <input
                    type="text"
                    value={sem.name}
                    onChange={(e) =>
                      handleSemesterNameChange(sem.id, e.target.value)
                    }
                    placeholder={`Semester ${sIdx + 1}`}
                    className="font-bold text-slate-900 bg-transparent hover:bg-white focus:bg-white px-2 py-1 rounded-lg border border-transparent hover:border-slate-300 focus:border-[#0096c7] focus:ring-1 focus:ring-[#0096c7] text-sm sm:text-base md:text-lg transition-colors w-full max-w-[200px] sm:max-w-xs"
                  />
                </div>

                {/* Semester Summary SGPA Tag & Actions */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className="bg-white border border-slate-200 rounded-xl px-2.5 sm:px-3.5 py-1 sm:py-1.5 flex items-center gap-2 sm:gap-3 shadow-2xs">
                    <div className="text-right">
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        SGPA
                      </div>
                      <div className="text-sm sm:text-base font-extrabold text-[#0077b6] font-mono leading-none">
                        {breakdown ? breakdown.sgpa.toFixed(2) : '0.00'}
                      </div>
                    </div>
                    <div className="h-5 sm:h-6 w-px bg-slate-200" />
                    <div className="text-right">
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        Credits
                      </div>
                      <div className="text-xs sm:text-xs font-bold text-slate-700 font-mono leading-none">
                        {breakdown ? breakdown.totalCredits : 0}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteSemester(sem.id)}
                    className="p-1.5 sm:p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    title="Delete Semester"
                    aria-label={`Delete ${sem.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Course Rows Table / Mobile Cards */}
              <div className="p-3 sm:p-5">
                {/* Column Headers for Desktop */}
                <div className="hidden md:grid grid-cols-12 gap-3 px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 mb-2">
                  <div className="col-span-5">Course Name / Code</div>
                  <div className="col-span-2 text-center">Credit Hours</div>
                  <div className="col-span-3 text-center">Grade Received</div>
                  <div className="col-span-1 text-center">Points</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>

                {/* Course List */}
                <div className="space-y-3 md:space-y-2">
                  {sem.courses.map((course, cIdx) => {
                    const gradePoint = gradePointsMap.get(
                      course.grade?.toUpperCase()
                    ) ?? 0;

                    return (
                      <div
                        key={course.id}
                        className="bg-slate-50/70 md:bg-transparent rounded-xl md:rounded-none p-3 md:p-1.5 border md:border-0 border-slate-200/80 hover:bg-[#f0fafd] transition-colors"
                      >
                        {/* Desktop Layout (md+) */}
                        <div className="hidden md:grid grid-cols-12 gap-3 items-center">
                          {/* Course Name */}
                          <div className="col-span-5">
                            <input
                              type="text"
                              placeholder={`e.g. Course ${cIdx + 1} or Subject Name`}
                              value={course.name}
                              onChange={(e) =>
                                handleCourseChange(
                                  sem.id,
                                  course.id,
                                  'name',
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-900 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#48cae4] focus:border-[#0096c7] placeholder:text-slate-400"
                            />
                          </div>

                          {/* Credits Input */}
                          <div className="col-span-2">
                            <input
                              type="number"
                              inputMode="decimal"
                              step="0.5"
                              min="0"
                              max="30"
                              placeholder="3"
                              value={course.credits}
                              onChange={(e) =>
                                handleCourseChange(
                                  sem.id,
                                  course.id,
                                  'credits',
                                  e.target.value
                                )
                              }
                              className="w-full px-2.5 py-1.5 text-center text-xs sm:text-sm font-bold text-slate-900 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#48cae4] focus:border-[#0096c7]"
                            />
                          </div>

                          {/* Grade Dropdown */}
                          <div className="col-span-3">
                            <div className="relative w-full">
                              <select
                                value={course.grade}
                                onChange={(e) =>
                                  handleCourseChange(
                                    sem.id,
                                    course.id,
                                    'grade',
                                    e.target.value
                                  )
                                }
                                className="w-full appearance-none px-3 py-1.5 pr-8 text-xs sm:text-sm font-bold text-[#0077b6] bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#48cae4] focus:border-[#0096c7] cursor-pointer"
                              >
                                {gradeScale.map((scaleItem, idx) => (
                                  <option key={idx} value={scaleItem.grade}>
                                    {scaleItem.grade} ({scaleItem.points.toFixed(1)} pts)
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          {/* Calculated Quality Points */}
                          <div className="col-span-1 text-center font-mono font-bold text-slate-700 text-xs sm:text-sm">
                            {((parseFloat(course.credits) || 0) * gradePoint).toFixed(1)}
                          </div>

                          {/* Delete Row Button */}
                          <div className="col-span-1 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteCourse(sem.id, course.id)
                              }
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                              title="Remove Course"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Mobile & Tablet Card Layout (<md) */}
                        <div className="md:hidden space-y-2.5">
                          {/* Row 1: Course Name + Delete */}
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder={`Course ${cIdx + 1} (e.g. Calculus I)`}
                              value={course.name}
                              onChange={(e) =>
                                handleCourseChange(
                                  sem.id,
                                  course.id,
                                  'name',
                                  e.target.value
                                )
                              }
                              className="flex-1 px-3 py-2 text-xs font-medium text-slate-900 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#48cae4] placeholder:text-slate-400"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteCourse(sem.id, course.id)
                              }
                              className="p-2 text-slate-400 hover:text-red-600 bg-white border border-slate-200 rounded-xl hover:bg-red-50 transition-colors shrink-0"
                              title="Remove Course"
                              aria-label="Remove Course"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Row 2: Credits + Grade Dropdown + Points */}
                          <div className="grid grid-cols-12 gap-2 items-center">
                            {/* Credits */}
                            <div className="col-span-4">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                                Credits
                              </label>
                              <input
                                type="number"
                                inputMode="decimal"
                                step="0.5"
                                min="0"
                                max="30"
                                placeholder="3"
                                value={course.credits}
                                onChange={(e) =>
                                  handleCourseChange(
                                    sem.id,
                                    course.id,
                                    'credits',
                                    e.target.value
                                  )
                                }
                                className="w-full px-2.5 py-1.5 text-center text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#48cae4]"
                              />
                            </div>

                            {/* Grade */}
                            <div className="col-span-5">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                                Grade
                              </label>
                              <div className="relative w-full">
                                <select
                                  value={course.grade}
                                  onChange={(e) =>
                                    handleCourseChange(
                                      sem.id,
                                      course.id,
                                      'grade',
                                      e.target.value
                                    )
                                  }
                                  className="w-full appearance-none px-2.5 py-1.5 pr-6 text-xs font-bold text-[#0077b6] bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#48cae4] cursor-pointer"
                                >
                                  {gradeScale.map((scaleItem, idx) => (
                                    <option key={idx} value={scaleItem.grade}>
                                      {scaleItem.grade} ({scaleItem.points.toFixed(1)})
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>

                            {/* Calculated Points */}
                            <div className="col-span-3 text-right">
                              <span className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                                Points
                              </span>
                              <div className="py-1.5 px-2 bg-white border border-slate-200 rounded-xl text-center font-mono font-bold text-xs text-slate-800">
                                {((parseFloat(course.credits) || 0) * gradePoint).toFixed(1)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add Course Button */}
                <div className="mt-3.5 sm:mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleAddCourse(sem.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#0077b6] bg-[#e0f7fc] hover:bg-[#b8eff7] border border-[#90e0ef]/60 rounded-xl transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Course to {sem.name}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Global Add Semester Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-2xl sm:rounded-3xl border border-dashed border-slate-300">
          <div className="text-center sm:text-left">
            <span className="text-sm font-bold text-slate-900 block">
              Have more semesters to include?
            </span>
            <span className="text-xs text-slate-500">
              Add past or upcoming terms to calculate your cumulative GPA total.
            </span>
          </div>
          <button
            type="button"
            onClick={handleAddSemester}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0096c7] hover:bg-[#0077b6] text-white font-bold text-sm shadow-xs shadow-cyan-200 transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Semester</span>
          </button>
        </div>
      </div>
    </div>
  );
}
