/*반별 성별 인원 파악*/
--Group by 이용
--결과 리스트에 NULL이 있으면 0으로 대체
SELECT G.sex, NVL(TMP.cnt, 0)
FROM GENDER G
LEFT JOIN
(SELECT CUR_GROUP.sex, COUNT(*) AS cnt
FROM ATTENDANCE A, 
(SELECT student_id, sex
	FROM STUDENT_LIST S
	WHERE S.my_group = '1' AND S.grade = '1' AND S.my_class = '1' AND S.student_state > 0
) CUR_GROUP
WHERE A.student_id = CUR_GROUP.student_id
AND A.attendance_date BETWEEN TO_DATE('2022-01-22', 'YYYY-MM-DD') 
                          AND TO_DATE('2022-11-23', 'YYYY-MM-DD')
GROUP BY CUR_GROUP.sex) TMP
ON G.sex=TMP.sex;