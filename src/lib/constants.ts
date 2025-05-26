
import type { Quote, Exercise, Hospital, FASTStep, HealthcareService, Nurse } from '@/types';
import { Smile, Users, MessageSquare, Clock, UserRoundPlus, Home, Video, Truck, TestTube2 } from 'lucide-react';

export const motivationalQuotes: Quote[] = [
  { id: '1', text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { id: '2', text: "Your present circumstances don't determine where you can go; they merely determine where you start.", author: "Nido Qubein" },
  { id: '3', text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { id: '4', text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { id: '5', text: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.", author: "Thomas A. Edison" },
  { id: '6', text: "Recovery is not one and done. It's a lifelong journey that takes place one day, one step at a time.", author: "Unknown" },
  { id: '7', text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" }
];

export const rehabilitationExercises: Exercise[] = [
  {
    id: '1',
    name: 'Arm Raises (Shoulder Flexion)',
    description: 'Helps improve shoulder mobility and strength.',
    instructions: [
      'Sit or stand tall with your arm by your side.',
      'Slowly raise your affected arm forward and up towards the ceiling as far as comfortable.',
      'Hold for 2-3 seconds.',
      'Slowly lower your arm back down.',
      'Repeat 10-15 times.'
    ],
    videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Arm Raises (Shoulder Flexion) stroke rehabilitation exercise guide')}`,
  },
  {
    id: '2',
    name: 'Wrist Bends (Wrist Flexion/Extension)',
    description: 'Aids in regaining wrist flexibility and control.',
    instructions: [
      'Rest your forearm on a table with your hand hanging off the edge, palm up.',
      'Slowly bend your wrist upwards, bringing your fingers towards you.',
      'Hold for 2-3 seconds.',
      'Slowly lower your wrist back to the starting position.',
      'Turn your palm down and repeat, bending your wrist upwards.',
      'Repeat each direction 10-15 times.'
    ],
    videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Wrist Bends (Wrist Flexion/Extension) stroke rehabilitation exercise guide')}`,
  },
  {
    id: '3',
    name: 'Sit to Stand',
    description: 'Improves leg strength and balance, essential for walking.',
    instructions: [
      'Sit on a sturdy chair with your feet flat on the floor.',
      'Lean forward slightly and push through your heels to stand up.',
      'Stand tall for a moment.',
      'Slowly lower yourself back to a seated position.',
      'Repeat 10-15 times.'
    ],
    videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Sit to Stand stroke rehabilitation exercise guide')}`,
  },
  {
    id: '4',
    name: 'Finger Taps',
    description: 'Enhances fine motor skills and finger dexterity.',
    instructions: [
      'Rest your hand on a flat surface, palm down.',
      'Tap each finger one at a time against your thumb, starting with your index finger.',
      'Go through all fingers, then reverse the order.',
      'Alternatively, tap each finger on the table surface.',
      'Repeat 10-15 cycles.'
    ],
    videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Finger Taps stroke rehabilitation exercise guide')}`,
  },
  {
    id: '5',
    name: 'Seated Trunk Twists',
    description: 'Improves core strength and flexibility of the spine.',
    instructions: [
      'Sit tall in a chair with your feet flat on the floor and knees bent at 90 degrees.',
      'Place your hands on your shoulders or across your chest.',
      'Slowly twist your upper body to one side as far as comfortable, keeping your hips stable.',
      'Hold for 2-3 seconds.',
      'Return to the center and then twist to the other side.',
      'Repeat 10-15 times to each side.'
    ],
    videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Seated Trunk Twists stroke rehabilitation exercise guide')}`,
  },
  {
    id: '6',
    name: 'Ankle Pumps',
    description: 'Helps improve circulation and range of motion in the ankles.',
    instructions: [
      'Sit or lie down with your legs extended.',
      'Gently point your toes away from you (plantarflexion).',
      'Hold for 2-3 seconds.',
      'Then, pull your toes towards you, flexing your ankle (dorsiflexion).',
      'Hold for 2-3 seconds.',
      'Repeat 15-20 times for each ankle.'
    ],
    videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent('Ankle Pumps stroke rehabilitation exercise guide')}`,
  }
];

export const fastTestSteps: FASTStep[] = [
  {
    id: 'F',
    title: 'Face Drooping',
    description: 'Does one side of the face droop or is it numb?',
    checkItems: ['Ask the person to smile.', 'Is the smile uneven or lopsided?'],
    details: 'Facial drooping, especially on one side, is a common sign of a stroke. The inability to make a symmetrical smile can indicate muscle weakness caused by the stroke.',
    icon: Smile,
  },
  {
    id: 'A',
    title: 'Arm Weakness',
    description: 'Is one arm weak or numb?',
    checkItems: ['Ask the person to raise both arms.', 'Does one arm drift downward or is unable to rise?'],
    details: 'Sudden weakness or numbness in one arm is another key indicator. If one arm drifts down when both are raised, it could signal a stroke.',
    icon: Users,
  },
  {
    id: 'S',
    title: 'Speech Difficulty',
    description: 'Is speech slurred, are they unable to speak, or are they hard to understand?',
    checkItems: ['Ask the person to repeat a simple sentence, like "The sky is blue."', 'Is the sentence repeated correctly? Is their speech slurred or strange?'],
    details: 'Difficulty speaking, slurred speech, or inability to understand speech can be symptoms of a stroke. Pay attention to any sudden changes in communication.',
    icon: MessageSquare,
  },
  {
    id: 'T',
    title: 'Time to call Emergency Services',
    description: 'If you observe any of these signs, it’s time to call emergency services immediately.',
    checkItems: ['Note the time when the first symptoms appeared.', 'Call emergency services (e.g., 112) right away.'],
    details: 'Time is critical in stroke treatment. The sooner a person receives medical attention, the better their chances of recovery. Do not delay in calling for help.',
    icon: Clock,
  },
];


export const sampleHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Olive Hospital - Hyderabad',
    address: '9-4-87/A/23 & 24, Salarjung Colony, Inner Ring Rd, Mehdipatnam, Hyderabad, Telangana 500028, India',
    phone: '+91 40 2351 5000',
    services: ['Multi-Speciality Care', 'Emergency Services', 'Diagnostics & Imaging', 'Stroke Unit'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Apollo_hospital_hyderabad.jpg/640px-Apollo_hospital_hyderabad.jpg',
    imageHint: 'modern hospital hyderabad',
  },
  {
    id: '2',
    name: 'Premier Hospital - Hyderabad',
    address: '#12-2-823/A/25, St Ann\'s School Rd, Santosh Nagar, Mehdipatnam, Hyderabad, Telangana 500028, India',
    phone: '+91 40 2353 8686',
    services: ['General Medicine', 'Orthopedics', 'Neurology Consultations', '24/7 Pharmacy'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Fortis_Hospital_Mohali_India.jpg/640px-Fortis_Hospital_Mohali_India.jpg',
    imageHint: 'hospital building hyderabad',
  },
  {
    id: '3',
    name: 'Sarojini Devi Eye Hospital - Hyderabad',
    address: '7VPC+J6P, Humayun Nagar Rd, Humayun Nagar, Mehdipatnam, Hyderabad, Telangana 500028, India',
    phone: '+91 40 2334 0119',
    services: ['Specialized Eye Care', 'Emergency Eye Services', 'Outpatient Department'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sarojini_Devi_Eye_Hospital_Block.JPG/640px-Sarojini_Devi_Eye_Hospital_Block.JPG',
    imageHint: 'eye hospital hyderabad',
  },
   {
    id: '4',
    name: 'Ayaan Hospital - Hyderabad',
    address: '12-2-417/A/2, Main Road, beside Subhash Chandra Bose Statue, near NMDC, Gudimalkapur, Mehdipatnam, Hyderabad, Telangana 500028, India',
    phone: '+91 72073 57861',
    services: ['Multi-Speciality Services', 'Intensive Care Unit', 'Surgical Facilities'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/KIMS_hospital_Secunderabad.jpg/640px-KIMS_hospital_Secunderabad.jpg',
    imageHint: 'multi-speciality hospital hyderabad',
  },
  {
    id: '5',
    name: 'Bombay Hospital & Medical Research Centre - Mumbai',
    address: '12, Vitthaldas Thackersey Marg, New Marine Lines, Mumbai, Maharashtra 400020, India',
    phone: '+91 22 2206 7676',
    services: ['Emergency Care', 'Cardiology', 'Neurology', 'Advanced Stroke Care'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bombay_Hospital_in_Mumbai.jpg/640px-Bombay_Hospital_in_Mumbai.jpg',
    imageHint: 'city hospital building mumbai',
  },
  {
    id: '6',
    name: 'Max Healthcare Saket - Delhi',
    address: 'Press Enclave Road, Saket, New Delhi, Delhi 110017, India',
    phone: '+91 11 2651 5050',
    services: ['Comprehensive Stroke Center', 'Intensive Care', 'Neurosurgery', 'Rehabilitation Services'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Max_Hospital_Pitampura_new_delhi.jpg/640px-Max_Hospital_Pitampura_new_delhi.jpg',
    imageHint: 'modern medical center delhi',
  },
  {
    id: '7',
    name: 'Kokilaben Dhirubhai Ambani Hospital - Mumbai',
    address: 'Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai, Maharashtra 400053, India',
    phone: '+91 22 3066 6666',
    services: ['Multi-Speciality', 'Robotic Surgery', 'Cancer Care', 'Stroke Program'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Kokilaben_Dhirubhai_Ambani_Hospital_building.jpg/640px-Kokilaben_Dhirubhai_Ambani_Hospital_building.jpg',
    imageHint: 'large hospital mumbai',
  },
  {
    id: '8',
    name: 'Lilavati Hospital and Research Centre - Mumbai',
    address: 'A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050, India',
    phone: '+91 22 2675 1000',
    services: ['Neurology', 'Cardiology', 'Oncology', 'Emergency Room'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Lilavati_Hospital_and_Research_Centre%2C_Bandra%2C_Mumbai.jpg/640px-Lilavati_Hospital_and_Research_Centre%2C_Bandra%2C_Mumbai.jpg',
    imageHint: 'research hospital mumbai',
  },
  {
    id: '9',
    name: 'Breach Candy Hospital Trust - Mumbai',
    address: '60 A, Bhulabhai Desai Road, Breach Candy, Mumbai, Maharashtra 400026, India',
    phone: '+91 22 2367 1888',
    services: ['Critical Care', 'Diagnostic Services', 'Surgical Specialties', 'Neurology'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Breach_Candy_Hospital.jpg/640px-Breach_Candy_Hospital.jpg',
    imageHint: 'classic hospital mumbai',
  },
  {
    id: '10',
    name: 'Indraprastha Apollo Hospitals - Delhi',
    address: 'Delhi Mathura Road, Sarita Vihar, New Delhi, Delhi 110076, India',
    phone: '+91 11 2692 5858',
    services: ['Advanced Stroke Unit', 'Organ Transplant', 'Cardiac Sciences', 'Neurosciences'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Indraprastha_Apollo_Hospital_Delhi.jpg/640px-Indraprastha_Apollo_Hospital_Delhi.jpg',
    imageHint: 'apollo hospital delhi',
  },
  {
    id: '11',
    name: 'Fortis Escorts Heart Institute - Delhi',
    address: 'Okhla Road, New Friends Colony, New Delhi, Delhi 110025, India',
    phone: '+91 11 4713 5000',
    services: ['Cardiac Care', 'Emergency Services', 'Neurology', 'Vascular Surgery'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Fortis_Escorts_Heart_Institute_Okhla_Delhi.jpg/640px-Fortis_Escorts_Heart_Institute_Okhla_Delhi.jpg',
    imageHint: 'heart institute delhi',
  },
  {
    id: '12',
    name: 'Sir Ganga Ram Hospital - Delhi',
    address: 'Rajinder Nagar, New Delhi, Delhi 110060, India',
    phone: '+91 11 2575 0000',
    services: ['Multi-Speciality Care', 'Research Wing', 'Emergency Department', 'Stroke Clinic'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sir_Ganga_Ram_Hospital_Building.jpg/640px-Sir_Ganga_Ram_Hospital_Building.jpg',
    imageHint: 'ganga ram hospital delhi',
  }
];

// New constants for Healthcare Services
export const healthcareServicesList: HealthcareService[] = [
  {
    id: 'home-nurse-booking',
    title: 'Home Nurse Booking',
    description: 'Book certified nurses for dedicated in-home medical care and support.',
    icon: UserRoundPlus,
    href: '/healthcare-services/home-nurse-booking',
    cta: 'Book a Nurse',
  },
  {
    id: 'doctor-visits-at-home',
    title: 'Doctor Visits at Home',
    description: 'Schedule convenient at-home consultations with qualified doctors.',
    icon: Home,
    href: '/healthcare-services/doctor-visits',
    cta: 'Schedule Visit',
  },
  {
    id: 'video-consultation',
    title: 'Video Consultation',
    description: 'Connect with doctors virtually for consultations from the comfort of your home.',
    icon: Video,
    href: '/healthcare-services/video-consultation',
    cta: 'Consult Online',
  },
  {
    id: 'pharma-medication-delivery',
    title: 'Pharma & Medication Delivery',
    description: 'Order prescribed medications and healthcare products delivered to your doorstep.',
    icon: Truck,
    href: '/healthcare-services/pharma-delivery',
    cta: 'Order Medicines',
  },
  {
    id: 'at-home-blood-tests',
    title: 'At-Home Blood Tests',
    description: 'Book lab technicians for sample collection at home and get digital reports.',
    icon: TestTube2,
    href: '/healthcare-services/lab-tests',
    cta: 'Book a Test',
  },
];

export const sampleNurses: Nurse[] = [
  {
    id: 'nurse001',
    name: 'Priya Sharma',
    specializations: ['Stroke Rehabilitation', 'Geriatric Care', 'Post-operative Care'],
    experienceYears: 8,
    hourlyRate: 1200, // INR
    availability: 'Mon-Sat, 8am-6pm',
    imageUrl: 'https://placehold.co/300x300.png',
    imageHint: 'female nurse professional',
    bio: 'Priya is a dedicated and compassionate nurse with extensive experience in helping stroke patients regain independence. She is skilled in mobility assistance, medication management, and providing emotional support.'
  },
  {
    id: 'nurse002',
    name: 'Amit Singh',
    specializations: ['Neurological Care', 'Wound Management', 'Palliative Care'],
    experienceYears: 12,
    hourlyRate: 1500, // INR
    availability: 'Flexible, including evenings',
    imageUrl: 'https://placehold.co/300x300.png',
    imageHint: 'male nurse smiling',
    bio: 'Amit is a highly skilled nurse specializing in complex neurological conditions. He is proficient in advanced wound care techniques and offers compassionate palliative support.'
  },
  {
    id: 'nurse003',
    name: 'Sunita Reddy',
    specializations: ['Cardiac Care', 'Diabetes Management', 'Elderly Support'],
    experienceYears: 6,
    hourlyRate: 1100, // INR
    availability: 'Weekdays, 9am-5pm',
    imageUrl: 'https://placehold.co/300x300.png',
    imageHint: 'nurse with stethoscope',
    bio: 'Sunita has a strong background in cardiac care and diabetes education. She is passionate about empowering patients and their families with the knowledge to manage chronic conditions effectively at home.'
  },
  {
    id: 'nurse004',
    name: 'Rajesh Kumar',
    specializations: ['Emergency Care', 'ICU Experience', 'Ventilator Management'],
    experienceYears: 10,
    hourlyRate: 1400,
    availability: 'Mon-Fri, 7am-7pm',
    imageUrl: 'https://placehold.co/300x300.png',
    imageHint: 'male nurse focused',
    bio: 'Rajesh is an experienced critical care nurse, adept at handling emergency situations and managing patients requiring intensive care.'
  },
  {
    id: 'nurse005',
    name: 'Anjali Mehta',
    specializations: ['Pediatric Care', 'Special Needs Support', 'Home Infusion Therapy'],
    experienceYears: 7,
    hourlyRate: 1300,
    availability: 'Flexible, Weekends preferred',
    imageUrl: 'https://placehold.co/300x300.png',
    imageHint: 'female nurse gentle',
    bio: 'Anjali specializes in pediatric home care and is skilled in supporting children with special needs. She is also experienced in home infusion therapies.'
  },
  {
    id: 'nurse006',
    name: 'Vikram Patel',
    specializations: ['Orthopedic Care', 'Post-Surgery Rehabilitation', 'Pain Management'],
    experienceYears: 9,
    hourlyRate: 1350,
    availability: 'Tue-Sat, 10am-6pm',
    imageUrl: 'https://placehold.co/300x300.png',
    imageHint: 'nurse assisting patient',
    bio: 'Vikram has a strong background in orthopedic nursing, assisting patients with recovery after surgery and managing chronic pain conditions.'
  },
  {
    id: 'nurse007',
    name: 'Deepa Iyer',
    specializations: ['Mental Health Support', 'Counseling', 'Dementia Care'],
    experienceYears: 11,
    hourlyRate: 1600,
    availability: 'Mon, Wed, Fri, 9am-3pm',
    imageUrl: 'https://placehold.co/300x300.png',
    imageHint: 'female nurse empathetic',
    bio: 'Deepa is a compassionate nurse focusing on mental health and dementia care, providing both medical support and counseling to patients and families.'
  },
  {
    id: 'nurse008',
    name: 'Mohan Das',
    specializations: ['General Nursing', 'Elderly Companionship', 'Medication Reminders'],
    experienceYears: 5,
    hourlyRate: 1000,
    availability: 'Daily, 4-hour shifts',
    imageUrl: 'https://placehold.co/300x300.png',
    imageHint: 'senior care nurse',
    bio: 'Mohan provides general nursing care and companionship for the elderly, ensuring medication adherence and daily well-being checks.'
  }
];
