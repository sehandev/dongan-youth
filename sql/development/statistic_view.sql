/*반별 성별 출석 인원 통계용 뷰 create*/
CREATE OR REPLACE VIEW STATISTIC_VIEW
AS
	SELECT 
		S.student_id, S.sex, B.my_group, B.grade, B.my_class, A.attendance_date
	FROM
		STUDENTS S,
		BELONG_TO B,
		ATTENDANCE A
	WHERE
		S.student_id = A.student_id and S.student_id = B.student_id;
