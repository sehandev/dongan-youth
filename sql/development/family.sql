/*family 테이블 생성*/
create table family
(
    student_id NCHAR(8) NOT NULL,
    family_name VARCHAR(10) NOT NULL,
    relation VARCHAR(5) NOT NULL,
    current_church VARCHAR(50),
    church_office VARCHAR(10),
    contact_no VARCHAR(15) NOT NULL,
    fstudent_id NCHAR(8),
    
    constraint pk_family PRIMARY KEY(student_id, family_name),
    constraint fk_student_id FOREIGN KEY(student_id) references STUDENTS (student_id)
);