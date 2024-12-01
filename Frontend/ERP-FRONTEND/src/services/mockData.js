// Mock data for development
export const mockCourses = [
  {
    id: 1,
    name: 'Introduction to Computer Science',
    code: 'CS101',
    instructor: 'Dr. John Smith',
    schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
    credits: 3,
    description: 'Fundamental concepts of programming and computer science',
    department: 'Computer Science',
    semester: 'Fall 2023'
  },
  {
    id: 2,
    name: 'Data Structures and Algorithms',
    code: 'CS201',
    instructor: 'Dr. Sarah Johnson',
    schedule: 'Tue, Thu 2:00 PM - 3:30 PM',
    credits: 4,
    description: 'Advanced programming concepts and algorithm analysis',
    department: 'Computer Science',
    semester: 'Fall 2023'
  },
  {
    id: 3,
    name: 'Database Management Systems',
    code: 'CS301',
    instructor: 'Prof. Michael Brown',
    schedule: 'Mon, Wed 1:00 PM - 2:30 PM',
    credits: 3,
    description: 'Design and implementation of database systems',
    department: 'Computer Science',
    semester: 'Fall 2023'
  }
];

export const mockGrades = {
  1: [
    { type: 'Quiz 1', score: 85, maxScore: 100, weight: 0.1 },
    { type: 'Midterm', score: 78, maxScore: 100, weight: 0.3 },
    { type: 'Project', score: 92, maxScore: 100, weight: 0.3 }
  ],
  2: [
    { type: 'Assignment 1', score: 90, maxScore: 100, weight: 0.15 },
    { type: 'Quiz 1', score: 88, maxScore: 100, weight: 0.15 },
    { type: 'Midterm', score: 82, maxScore: 100, weight: 0.3 }
  ]
};

export const mockAttendance = {
  1: {
    '2023-09-01': 'present',
    '2023-09-03': 'present',
    '2023-09-08': 'absent',
    '2023-09-10': 'present'
  },
  2: {
    '2023-09-02': 'present',
    '2023-09-04': 'present',
    '2023-09-09': 'present',
    '2023-09-11': 'late'
  }
};

export const mockAssignments = {
  1: [
    {
      id: 1,
      title: 'Programming Assignment 1',
      description: 'Implement a basic calculator using Python',
      dueDate: '2023-10-01',
      maxScore: 100,
      submitted: false
    },
    {
      id: 2,
      title: 'Programming Assignment 2',
      description: 'Create a simple game using Python',
      dueDate: '2023-10-15',
      maxScore: 100,
      submitted: false
    }
  ],
  2: [
    {
      id: 3,
      title: 'Implementation of Sorting Algorithms',
      description: 'Implement and analyze various sorting algorithms',
      dueDate: '2023-10-05',
      maxScore: 100,
      submitted: false
    }
  ]
};

export const mockMaterials = {
  1: [
    {
      id: 1,
      title: 'Week 1 Lecture Notes',
      type: 'pdf',
      uploadDate: '2023-09-01',
      size: '2.5MB'
    },
    {
      id: 2,
      title: 'Python Installation Guide',
      type: 'pdf',
      uploadDate: '2023-09-01',
      size: '1.2MB'
    }
  ],
  2: [
    {
      id: 3,
      title: 'Sorting Algorithms Slides',
      type: 'pptx',
      uploadDate: '2023-09-02',
      size: '5.1MB'
    }
  ]
};

export const mockAnnouncements = [
  {
    id: 1,
    title: 'Welcome to CS101',
    content: 'Welcome to Introduction to Computer Science! Please review the syllabus.',
    date: '2023-09-01',
    courseId: 1
  },
  {
    id: 2,
    title: 'Assignment 1 Posted',
    content: 'The first programming assignment has been posted. Due date: Oct 1',
    date: '2023-09-15',
    courseId: 1
  }
];
