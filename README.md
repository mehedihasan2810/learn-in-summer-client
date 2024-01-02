# [Learn In Summer Is A Music Education Platform](https://learn-in-summer.web.app)

[Learn In Summer](https://learn-in-summer.web.app) is a portal for music education. It has role-based access for users, administrators, and instructors. Any instructor can sell their classes on musical instruments such as piano, guitar, drums, and so on. They can also add and update their classes. Administrators can control classes added by instructors as well as users. Stats are shown in clear charts for teachers and administrators to view. A fun place to learn and teach music!

## [Back-End Source Code](https://github.com/mehedihasan2810/learn-in-summer-server)

## Key Features

1.  **Authentication System:**

    - Implemented Firebase authentication for secure and seamless user sign-in and sign-up processes.
    - Three-tier authentication levels: Normal User, Instructor, and Admin.

2.  **Role-Based Access:**

    - Defined user roles (Normal User, Instructor, Admin) with corresponding access privileges.
    - Admin has the authority to manage users and classes, ensuring secure and controlled access.

3.  **Class Management:**

    - Instructors can add new classes to the platform.
    - Instructors have the capability to update and modify class details.

4.  **User Management:**

    - Admin functionality includes managing user accounts.
    - Admin can handle user-related operations, enhancing overall platform administration.

5.  Statistics Dashboard:

    - Implemented a statistics dashboard using Recharts library.
    - Displays insightful charts providing a visual representation of various platform metrics.

6.  **Front-End Technologies:**

    - Utilized ReactJS for building a dynamic and interactive user interface.
    - Employed React Query for efficient data fetching and management.

7.  **UI Framework:**

    - Integrated Material UI for a consistent and aesthetically pleasing user interface design.
    - Ensured a responsive and user-friendly experience through CSS styling.

8.  **Form Handling:**

    - Implemented form handling using React Hook Form for seamless data input and validation.
    - Enhanced user experience during data submission and interaction.

9.  **Backend Technologies:**

    - Utilized NodeJS and ExpressJS for building a robust and scalable backend infrastructure.
    - Employed MongoDB as the database for efficient data storage and retrieval.

10. **Payment Integration:**
    - Integrated Stripe API for secure and reliable payment processing.
    - Users, including instructors, can conduct financial transactions with confidence.

## Technologies used:-

- Front-End - `ReactJS` `React Query` `Axios` `Material UI` `React Hook Form` `gsap` `CSS`
- Charts - `Recharts`
- Back-End - `NodeJS` `ExpressJS` `MongoDB` `Mongoose` `Typescript` - [Back-End Repo](https://github.com/mehedihasan2810/learn-in-summer-server)
- Auth - `Firebase Auth`
- Payment System - `Stripe API`

## [Home page](https://learn-in-summer.web.app)

![Learn in summer application's home page image](/public/assets/lis-home.png)

## [Classes page](https://learn-in-summer.web.app/all-classes)

![Learn in summer application's all classes page image](/public/assets/lis-classes.png)

## [Instructor page](https://learn-in-summer.web.app/instructors)

![Learn in summer application's instructors page image](/public/assets/lis-instructor.png)

# Admin Specific Routes

## [Dashboard](https://learn-in-summer.web.app/dashboard/statistics)

![Learn in summer application's dashboard statistics page image](/public/assets/lis-dashboard.png)

## [Manage Classes](https://learn-in-summer.web.app/dashboard/manage-classes)

![Learn in summer application's dashboard manage classes page image](/public/assets/lis-manage-classes.png)

## [Manage Users](https://learn-in-summer.web.app/dashboard/manage-classes)

![Learn in summer application's dashboard manage users page image](/public/assets/lis-manage-users.png)
