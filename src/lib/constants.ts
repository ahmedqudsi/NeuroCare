
import type { Quote, Exercise, Hospital, FASTStep } from '@/types';
import { Smile, Users, MessageSquare, Clock } from 'lucide-react';

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
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'arm exercise',
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
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'wrist exercise',
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
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'leg exercise',
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
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'finger exercise',
  },
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
    checkItems: ['Note the time when the first symptoms appeared.', 'Call emergency services (e.g., 911, 112) right away.'],
    details: 'Time is critical in stroke treatment. The sooner a person receives medical attention, the better their chances of recovery. Do not delay in calling for help.',
    icon: Clock,
  },
];


export const sampleHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Olive Hospital',
    address: '9-4-87/A/23 & 24, Salarjung Colony, Inner Ring Rd, Mehdipatnam, Hyderabad, Telangana 500028, India',
    phone: '+91 40 2351 5000',
    services: ['Multi-Speciality Care', 'Emergency Services', 'Diagnostics & Imaging', 'Stroke Unit'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Apollo_hospital_hyderabad.jpg/640px-Apollo_hospital_hyderabad.jpg',
    imageHint: 'modern hospital',
  },
  {
    id: '2',
    name: 'Premier Hospital',
    address: '#12-2-823/A/25, St Ann\'s School Rd, Santosh Nagar, Mehdipatnam, Hyderabad, Telangana 500028, India',
    phone: '+91 40 2353 8686',
    services: ['General Medicine', 'Orthopedics', 'Neurology Consultations', '24/7 Pharmacy'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Fortis_Hospital_Mohali_India.jpg/640px-Fortis_Hospital_Mohali_India.jpg',
    imageHint: 'hospital building',
  },
  {
    id: '3',
    name: 'Sarojini Devi Eye Hospital',
    address: 'Mehdipatnam Main Rd, Humayun Nagar, Hyderabad, Telangana 500028, India',
    phone: '+91 40 2334 0119',
    services: ['Specialized Eye Care', 'Emergency Eye Services', 'Outpatient Department'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sarojini_Devi_Eye_Hospital_Block.JPG/640px-Sarojini_Devi_Eye_Hospital_Block.JPG',
    imageHint: 'eye hospital',
  },
   {
    id: '4',
    name: 'Ayaan Hospital',
    address: '12-2-417/A/2, Subhash Chandra Bose Rd, near NMDC, Gudimalkapur, Mehdipatnam, Hyderabad, Telangana 500028, India',
    phone: '+91 72073 57861',
    services: ['Multi-Speciality Services', 'Intensive Care Unit', 'Surgical Facilities'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/KIMS_hospital_Secunderabad.jpg/640px-KIMS_hospital_Secunderabad.jpg',
    imageHint: 'multi-speciality hospital',
  },
];

