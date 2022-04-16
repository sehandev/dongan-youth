/*테이블 create*/
CREATE TABLE STUDENTS(
    student_id NCHAR(8) NOT NULL,
    student_name NCHAR(10) NOT NULL,
    sex CHAR(1) NOT NULL,
    student_state CHAR(1) NOT NULL,
    CONSTRAINT students_pk PRIMARY KEY (student_id)
);

