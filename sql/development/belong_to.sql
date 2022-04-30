/*새로운 row가 insert될 때 자동으로 idx 증가*/
create or replace trigger idx_increment
before insert on belong_to
for each row
when (new.idx IS NULL)
begin
    SELECT idx_seq.NEXTVAL
    INTO :new.idx
    from dual;
end;
