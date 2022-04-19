/*출석 테이블 create*/
CREATE TABLE ATTENDANCE(
		student_id NCHAR(8) NOT NULL,
		attendance_date TIMESTAMP NULL,
		CONSTRAINT attendance_pk PRIMARY KEY(student_id, attendance_date),
		CONSTRAINT attendance_fk FOREIGN KEY(student_id)
		REFERENCES STUDENTS(student_id)
);


/*새로운 출석 insert*/
--DATE 형식으로 들어온다면
INSERT INTO ATTENDANCE
VALUES
(5626, TO_TIMESTAMP('2021-01-01 12:00:00'));

--TIMESTAMP 형식으로 들어온다면
INSERT INTO ATTENDANCE
VALUES
(5626, {time_number});


/*출석 정보 delete*/
DELETE FROM ATTENDANCE
WHERE student_id = 'input_id' AND attendance_date = 'input_date';
