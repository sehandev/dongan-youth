/*출석부 명단용 뷰 create*/
CREATE OR REPLACE VIEW STUDENT_LIST
AS
	SELECT 
		S.student_id, S.sex, S.student_state, G.my_group, G.grade, G.my_class
	FROM
		STUDENTS S,
		BELONG_TO B
	WHERE
		S.student_id = B.student_id;