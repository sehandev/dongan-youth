/*출석부 명단용 뷰 create*/
CREATE OR REPLACE VIEW STUDENT_LIST
AS
	SELECT 
		S.student_id, S.sex, S.student_state, B.my_group, B.grade, B.my_class
	FROM
		STUDENTS S,
		BELONG_TO B
	WHERE
		S.student_id = B.student_id;