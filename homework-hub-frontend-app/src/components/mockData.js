
export const mockAssignments = [
        {
            id:1,
            subject:"Math",
            title:"Addition Workshit",
            dueDate:"02-09-2026",
            status:"Pending"
        },
        {
            id:2,
            subject:"Science",
            title:"Parts of the plants",
            dueDate:"07-11-2026",
            status:"Completed"
        },
        {
            id:3,
            subject:"English",
            title:"Read chapter 2",
            dueDate:"06-09-2026",
            status:"Completed"
        },
        {
            id:4,
            subject:"Art",
            title:"Draw favorite character",
            dueDate:"15-09-2026",
            status:"Pending"
        }
    ];

export const mockStudents = [
    {
      id: 1,
      name: "Emma Johnson",
      parent: "Sarah Johnson",
      completedAssignments: 1,
      totalAssignments: 4
     },
    {
      id: 2,
      name: "Liam Smith",
      parent: "Michael Smith",
      completedAssignments: 2,
      totalAssignments: 8
    },
    {
      id: 3,
      name: "Olivia Brown",
      parent: "Jessica Brown",
      completedAssignments: 4,
      totalAssignments: 6
    },
    {
      id: 4,
      name: "Noah Davis",
      parent: "Emily Davis",
      completedAssignments: 4,
      totalAssignments: 7
    }
  ];

   export const mockMessages = [
    {id: 1, from: "Mrs.Gotsch", subject: "Science project due", date: "2026-09-15", read: true},
    {id: 2, from: "Mrs. McCoy", subject: "Reading logs due", date: "2026-08-30", read:false}
   ]; 
  
   export const mockTeacher = {
    name: "Mrs. Patterson",
    subject: "Science",
    grade: "2nd Grade",
    email: "patterson@aaruedu.com",
   };

   export const mockParent = {
    name: "Jessica Brown",
    child: "Olivia Brown",
    grade: "2nd Grade",
    email: "jessica.brown@aaruedu.com",
   };
   export const mockStudent = {
    name: "Olivia Brown",
    grade: "2nd Grade",
    teacher: "Mrs. Patterson",
    points: 250,
   }
  export const mockBadges = [
    { id: 1, name: "Super Reader", icon: "📚", earned: true},
    { id: 2, name: "Math Master", icon: "🧮", earned: true},
    {id: 3, name: "Science Hero", icon: "🔬", earned: false},
    {id: 4, name: "Creative Artist", icon: "🎨", earned: false},
    {id: 5, name: "Classroom Leader", icon: "🏅", earned: true},
  ]











