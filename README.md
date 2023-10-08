# NoteShare

## Abstract
Although existing note systems have their features, they cannot simultaneously support note browsing and searching, online authoring and sharing for notes, and collaborative editing of notes, to assist college students in their learning. In addition, the current note-sharing systems do not provide a plagiarism detection mechanism, which can lead to the unauthorized copying and modification of note content. Therefore, we developed NoteShare to solve those problems. oteShare enables users to obtain their required notes 
easily through a block-based note editor and NLP (Natural Language Processing) tools. Moreover, we implemented the co-editing features by using the CLOT (Control Loop-based Operational Transformation) algorithm and WebSocket, allowing classmates or students who have the relevant knowledge to write notes together. To protect intellectual property rights, we developed a plagiarism evaluation based on the diffmatch-patch API. 

## Main Features

### Real Time Collabrative Editing
CLOT (Control Loop Operational Transformation) method combines OT with concept control loop to solve collabrative editing with DOM date type. When conflicts are occured, it will use a retry-based method to handle conflicts between two DOM opeartions. One of them  will be accepted, and another one will be rejeccted. Besides, the rejected part will receive the accetped part's operation, and the rejected opeartion will be processed by operation transforming, and resend it to controller. The conflict handling method can reach serverless. Despite that the CLOT algorithm is pretty mataure, our study combines the algorithm with blocked-based editing lock technique to implement a note editor which supports collabrative editing between multi-users.

### Plagiarism and Citation Comparison Technology
Google diff-match-patch uses Myer's diff algorithm to implement article comparison. Compared with other implementation methods, it has the best time complexity while retaining the difference between the two strings and recording the original string. The deletion and addition of characters in the comparison target string are considered based on the plagiarism degree comparison that this project direction focuses on. This is currently the best choice. Therefore, this calculation is used in the implementation of plagiarism degree comparison. Law.


## Comparison between existing servicea or platforms

### ClearNote
ClearNote is a note platform, which has fewer subjects, and most of the notes is upload by high school students. However, the platform design is relatively simple, having less fuctions, the biggest drawback is that it only supports image type notes. 

### HackMD
HackMD has powerful collabrative editing technique, and classify the notes with hashtags. The editor also supports Markdown. However, the platform only can search using hashtags, and the hashtags are classrified unclearly, causing to leave many meaningless hashtags. 

### Notion
Notion also can use markdown to take a note. And by using block-based as a editing unit, users can rearrange their note easily.  There are many types of block like media, datebase, etc. The platform also support many convenient template to user. However, Notion is not a social platform, so users cannot access their own notes to others except by sharing it. The platform is relatively closed.

## Display
### Dragging block to edit a note
![image](https://github.com/yaoyao0103/NoteShare-Frontend/assets/76504560/b964065f-d24e-44a3-96c4-20c661519e1a)

### Recommendation Page and Search bar 
![image](https://github.com/yaoyao0103/NoteShare-Frontend/assets/76504560/74949e00-1c8b-4924-a415-ab069d2d3c5c)


