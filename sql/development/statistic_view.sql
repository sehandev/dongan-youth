/*반별 성별 출석 인원 통계용 뷰 create*/
CREATE OR REPLACE VIEW STATISTIC_VIEW
AS
	SELECT 
		S.student_id, S.sex, G.my_group, G.grade, G.my_class, A.attendance_date
	FROM
		STUDENTS S,
		BELONG_TO G,
		ATTENDANCE A
	WHERE
		S.student_id = A.student_id and S.student_id = G.student_id;

