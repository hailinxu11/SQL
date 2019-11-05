import pymysql


class Setmysql:
    def __init__(self, host, user, password, db):
        self.host = host
        self.user = user
        self.password = password
        self.db = db

    def GetConnect(self):
        if not self.db:
            raise (NameError, '没有目标数据库')
        return pymysql.connect(host=self.host, user=self.user, password=self.password, database=self.db, charset='utf8')

    def ParseSql(self, filename):
        data = open(filename, 'r').readlines()
        stmts = []
        DELIMITER = ';\n'
        stmt = ''

        for lineno, line in enumerate(data):
            if not line.strip():
                continue

            if line.startswith('--'):
                continue

            if 'DELIMITER' in line:
                DELIMITER = line.split()[1].replace(';', ';\n')
                if DELIMITER != ';\n':
                    continue

            if (DELIMITER not in line):
                stmt += line
                continue
            elif DELIMITER != ';\n':
                continue

            if stmt:
                if 'DELIMITER' not in line:
                    stmt += line
                stmts.append(stmt.strip())
                stmt = ''
            else:
                stmts.append(line.strip())
        return stmts

    def ExecSql(self, filename):
        conn = self.GetConnect()
        stmts = self.ParseSql(filename)
        with conn.cursor() as cursor:
            if not cursor:
                raise (NameError, '数据库访问失败')
            for stmt in stmts:
                print('start execute:\n')
                print(stmt)
                cursor.execute(stmt)
                print('execute success.\n')
            conn.commit()