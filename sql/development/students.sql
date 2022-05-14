/*테이블 create*/
CREATE TABLE STUDENTS(
    student_id NCHAR(8) NOT NULL,
    student_name NCHAR(10) NOT NULL,
    sex CHAR(1) NOT NULL,
    student_state CHAR(1) NOT NULL,
    address NChar(100) NOT NULL,
    home_number NChar(13),
    phone_number NChar(13),
    email NChar(50),
    birthday NChar(10) NOT NULL,
    CONSTRAINT students_pk PRIMARY KEY (student_id)
);
