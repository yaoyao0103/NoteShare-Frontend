# NoteShare

## Abstract
The motivation for this project is based on the observation that while university students frequently take notes, there is no existing platform that integrates all the necessary features. Some platforms only support personal notes or have unclear community categorizations, and notes are limited to either text or images, with the majority lacking collaborative editing capabilities.

NoteShare is a note-taking platform developed specifically for university students. We provide clear categorization of notes along with an automatic tagging feature. Additionally, our platform offers a drag-and-drop interface for constructing notes, allowing the inclusion of text, videos, images, and various components implemented using DOM elements, all with real-time collaborative editing capabilities. The platform also boasts a comprehensive note-sharing community where users can buy and sell notes and pose questions. Furthermore, we have implemented a plagiarism detection system to protect the intellectual property rights of authors.

## Main Features

### Real Time Collabrative Editing
CLOT (Control Loop Operational Transformation) method combines OT with concept control loop to solve collabrative editing with DOM data type. When conflicts are occured, it will use a retry-based method to handle conflicts between two DOM opeartions. One of them  will be accepted, and another one will be rejeccted. Besides, the rejected part will receive the accetped part's operation, and the rejected opeartion will be processed by operation transforming, and resend it to controller. The conflict handling method can reach serverless. Despite that the CLOT algorithm is pretty mataure, our study combines the algorithm with blocked-based editing lock technique to implement a note editor which supports collabrative editing between multi-users.

### Plagiarism and Citation Comparison Technology
Google diff-match-patch uses Myer's diff algorithm to implement article comparison. Compared with other implementation methods, it has the best time complexity while retaining the difference between the two strings and recording the original string. The deletion and addition of characters in the comparison target string are considered based on the plagiarism degree comparison that this project direction focuses on. This is currently the best choice. Therefore, this calculation is used in the implementation of plagiarism degree comparison.


## Comparison between existing platforms

### ClearNote
ClearNote is a note platform, which has fewer subjects, and most of the notes is upload by high school students. However, the platform design is relatively simple, having less fuctions, the biggest drawback is that it only supports image type notes. 

### HackMD
HackMD has powerful collabrative editing technique, and classify the notes with hashtags. The editor also supports Markdown. However, the platform only can search using hashtags, and the hashtags are classrified unclearly, causing to leave many meaningless hashtags. 

### Notion
Notion also can use markdown to take a note. And by using block-based as a editing unit, users can rearrange their note easily.  There are many types of block like media, datebase, etc. The platform also support many convenient template to user. However, Notion is not a social platform, so users cannot access their own notes to others except by sharing it. The platform is relatively closed.

## Display
### Dragging block to edit a note
![image](https://github.com/yaoyao0103/NoteShare-Frontend/assets/76504560/b964065f-d24e-44a3-96c4-20c661519e1a)

### Recommended notes and search bar 
![image](https://github.com/yaoyao0103/NoteShare-Frontend/assets/76504560/74949e00-1c8b-4924-a415-ab069d2d3c5c)

## Backend Repository of NoteShare
Link: https://github.com/allen3325/NoteShareDevBackend

## Demo
Link: https://www.youtube.com/watch?v=5lnt1ZTHh08&t=0s


