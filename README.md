This is a role-based Store Rating Platform built as part of the Roxiler Systems Full-Stack Intern Challenge.
The system allows users to rate stores, while administrators and store owners can manage and monitor ratings through dedicated dashboards.

I designed and implemented the complete system — backend (Express.js), frontend (React.js), authentication, and role-based access — in 3 days, focusing on functionality, clean code, and modular structure.
Frontend: React.js (pure CSS styling)
Backend: Node.js + Express.js
Database: MongoDB (Mongoose ORM)
Authentication: JWT + bcrypt (password hashing)
Email/OTP System: Nodemailer (for verification)
System Administrator Add new users (Admin/User/Store Owner), add stores, view all users and stores, access global statistics.
Store Owner	Log in, manage their own store, view all ratings given to their store, and see their average rating.
Normal User	Sign up, browse stores, search by name/address, submit or modify ratings (1–5).
