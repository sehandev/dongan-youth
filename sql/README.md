# SQL

- Production <br>
  백에서 DB에서 데이터를 받아오기 위한 select문
- Development <br>
  데이터베이스를 구축하기 위해 DB팀에서 사용하는 쿼리문

<br>

## 기본 SQL 문법

<br>

### 테이블 생성

```SQL
create table [테이블명]
(
  [칼럼명] [데이터 타입] NOT NULL,
  ...

  constraint [기본키 이름] PRIMARY KEY([칼럼1], [칼럼2]),
  constraint [외래키 이름] FOREIGN KEY([칼럼명]) references [참조할 테이블] ([참조할 칼럼])
);
```

<br>

### 테이블명 변경

```SQL
ALTER TABLE [변경전 테이블명] RENAME TO [변경후 테이블명];
```

<br>

### 칼럼 추가 및 삭제

```SQL
--칼럼 추가
ALTER TABLE [TABLE명] ADD [칼럼명] NUMBER(2) DEFAULT [디폴트값] NOT NULL;

--칼럼 삭제
ALTER TABLE [TABLE명] DROP COLUMN [칼럼명];
ALTER TABLE [TABLE명] DROP ([칼럼1], [칼럼2], [칼럼3], ...);
```

<br>

### 칼럼 속성 변경

```SQL
--칼럼 NULL 여부 변경
ALTER TABLE [TABLE명] MODIFY [칼럼명] NULL;
ALTER TABLE [TABLE명] MODIFY [칼럼명] NOT NULL;

--칼럼 데이터타입 변경
ALTER TABLE [TABLE명] MODIFY [칼럼명] NCHAR(5);
```

<br>

### 테이블/뷰 삭제

```SQL
--table 삭제
DROP TABLE [TABLE명];

--view 삭제
DROP VIEW [VIEW명];

--칼럼 삭제
DELETE FROM [TABLE명] WHERE [칼럼명] = [변경할값];
```

<br>

### 트리거 조회 및 삭제

```SQL
SELECT * FROM ALL_TRIGGERS;

DROP TRIGGER UPDATE_ID;
```

<br>

### 트리거 생성

```SQL
create or replace trigger idx_increment
before insert on belong_to
for each row
when (new.idx IS NULL)
begin
    SELECT idx_seq.NEXTVAL
    INTO :new.idx
    from dual;
end;
```

<br>

### 테이블 및 칼럼명 전체 조회

```sql
--테이블 목록 보기
SELECT * FROM USER_OBJECTS WHERE OBJECT_TYPE='TABLE';

--모든 칼럼 조회
SELECT * FROM USER_TAB_COLUMNS;
```

<br>

### sequence 생성

```SQL
CREATE SEQUENCE idx_seq
  START WITH 1
  INCREMENT BY 1
  MAXVALUE 1000;

  UPDATE belong_to
   SET idx = idx_seq.nextval;
```

<br>

### sequence 값 설정

```SQL
alter sequence [sequence명] increment by [설정할 값];
```
