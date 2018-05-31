#!/usr/bin/env python
# -*- coding: gbk -*-

"""
__title__ = ''
__author__ = 'Administrator'
__mtime__ = '2017-10-09'
"""
import time
import datetime
import numpy as np
import pandas as pd
import pymysql
from dateutil.parser import parse

from config import *


def xiaobaods_a(SQL_msg="", line_b=0, line_f=20, date="", category="ţ�п�", length=7, SQL="xiaobaods",
                table="bc_attribute_granularity_sales", variable="��������", fillna="", debug=0, path="", keyword="���ڣ�",
                rankl=0, rankm=0, titler="", storer="", v1l=0, v1m=0, v2l=0, v2m=0, v3l=0, v3m=0):
    '''
    # 2017-10-10 All rewrite
    '''
    if not SQL_msg:
        return None
    if line_b > line_f:
        line_b, line_f = line_f, line_b
    time_s = time.time()
    latest_date = datetime.datetime.today().date() - datetime.timedelta(1)
    if category not in ["ţ�п�", "��׿�", "���п�"]:
        category = "ţ�п�"
    if length > 14 or length < 3:
        length = 7
    if SQL not in SQL_msg:
        SQL = SQL_msg[0]
    if table not in ["bc_attribute_granularity_sales", "bc_attribute_granularity_visitor"]:
        table = "bc_attribute_granularity_sales"
    if date == "":
        date = latest_date
    else:
        date = parse(date).date()  # �޸����ڸ�ʽ
    if table == "bc_attribute_granularity_sales":
        sql_select_f = "SELECT CT.`��ͼ����ͼ`,CT.`��������`,CT.`��Ʒ��Ϣ`,CT.`��������`,CT.`֧���Ӷ�����`,CT.`������������`," \
                       "CT.`֧��ת����ָ��`,CT.`��������`,CT.`��������`,CT.`�鿴����`,CT.`ͬ���Դ`"
        if variable not in ["��������", "֧���Ӷ�����", "������������", "֧��ת����ָ��"]:
            variable = "��������"
    elif table == "bc_attribute_granularity_visitor":
        sql_select_f = "SELECT CT.`��ͼ����ͼ`,CT.`��������`,CT.`��Ʒ��Ϣ`,CT.`��������`,CT.`����ָ��`,CT.`��������`,CT." \
                       "`֧���Ӷ�����`,CT.`��������`,CT.`��������`,CT.`�鿴����`,CT.`ͬ���Դ`"
        if variable not in ["��������", "����ָ��", "��������", "֧���Ӷ�����"]:
            variable = "��������"
    # Try to connect with the mysql and back a date which minimum.
    try:
        conn = pymysql.connect(host=SQL_msg[SQL]["host"], port=int(SQL_msg[SQL]["port"]), user=SQL_msg[SQL]["user"],
                                passwd=SQL_msg[SQL]["passwd"], charset=SQL_msg[SQL]["charset"], db=SQL_msg[SQL]["db"])
        cursor = conn.cursor()
        cursor.execute("SELECT min(`����`),max(`����`) from " + table + " where `��Ŀ`='" + category + "';")
        date_limit = cursor.fetchall()
        date_floor = date_limit[0][0]
        date_ceiling = date_limit[0][1]
        cursor.close()
        conn.close()
    except Exception as e:
        return e
    if date > latest_date:
        date = latest_date
    if date > date_ceiling:
        date = date_ceiling
    if date < date_floor + datetime.timedelta (length - 1):
        date = date_floor + datetime.timedelta(length - 1)
    # Main program.
    sql_select_m = ""
    for i in range(length):
        sql_select_m += ",MAX(CASE ST.���� WHEN " + str(date - datetime.timedelta(length - i - 1)).replace("-",
                                        "") + " THEN ST." + variable + " ELSE NULL END) AS `���ڣ�" + str(
            date - datetime.timedelta(length - i - 1)).replace("-", "") + "` "
    sql_select_re = ""
    if 0 < rankl <= 500:
        sql_select_re += " AND CT.`��������`>=" + str(rankl)
    if 0 < rankm <= 500:
        sql_select_re += " AND CT.`��������`<=" + str(rankm)
    if titler:
        sql_select_re += " AND CT.`��Ʒ��Ϣ` REGEXP('" + titler + "')"
    if storer:
        sql_select_re += " AND CT.`��������` REGEXP('" + storer + "')"
    if v1l != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[4] + "<=" + str(v1l)
    if v1m != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[4] + ">=" + str(v1m)
    if v2l != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[5] + "<=" + str(v2l)
    if v2m != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[5] + ">=" + str(v2m)
    if v3l != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[6] + "<=" + str(v3l)
    if v3m != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[6] + ">=" + str(v3m)
    sql_select_b = "FROM " + table + " AS CT LEFT JOIN " + table + " AS ST ON CT.`��������` = ST.`��������` " \
                                                                   "WHERE CT.`����` = " + str(date).replace("-", "") \
            + " AND CT.��Ŀ = '" + category + "' AND ST.���� >= " + str(date - datetime.timedelta(length)).replace("-",
                                                     "") + " AND ST.��Ŀ = '" + category + "'" + sql_select_re
    sql_select_e = " GROUP BY CT.`��������`,CT.`" + variable + "` ORDER BY CT.`��������` LIMIT " + str(line_b) + ","\
                   + str(line_f-line_b) + ";"
    sql_select_c = "SELECT COUNT(*) AS total FROM " + table + " AS CT WHERE CT.`����` = " + str(date).replace("-", "") \
            + " AND CT.��Ŀ = '" + category + "'" + sql_select_re + ";"
    # read msg from Mysql
    conn = pymysql.connect(host=SQL_msg[SQL]["host"], port=int(SQL_msg[SQL]["port"]), user=SQL_msg[SQL]["user"],
                            passwd=SQL_msg[SQL]["passwd"], charset=SQL_msg[SQL]["charset"], db=SQL_msg[SQL]["db"])
    total = pd.read_sql_query(sql_select_c, conn).iloc[0, 0]
    df = pd.read_sql_query(sql_select_f + sql_select_m + sql_select_b + sql_select_e, conn)
    df["total"] = total
    conn.close()
    if fillna == "bd":
        df = df.fillna(method="bfill", limit=1, axis=1)
        df.dropna(inplace=True)
    elif fillna == "drop":
        df.dropna(inplace=True)
    elif fillna == "":
        pass
    else:
        df = df.fillna(fillna)
    if debug not in [1, 2, 8, 9]:
        print(df.to_json(orient="index"))
    elif debug == 8:
        return df
    elif debug == 2:
        print("- Running time��%.4f s" % (time.time() - time_s))
        print("- date��%r \n- category��%r \n- length��%r \n- page: %r(%r-%r) \n- SQL��%r \n- table: %r \n- variable��%r"
              " \n- debug��%r \n- path: %r\n- keyword: %r" % (str(date), category, str(length), total, line_b, line_f, SQL,
                                                          table, variable, debug, path, keyword))
    elif debug == 1:
        print("- Running time��%.4f s" % (time.time() - time_s))
        print("  SQL_choice: %r \n- category: %r \n- length: %r \n- date: %r \n- total_SQL: %r \n- SQL: %r" %
                (SQL, category, str(length), str(date), sql_select_c, sql_select_f + sql_select_m +
                 sql_select_b + sql_select_e))
    elif debug == 9:
        import os
        print("- Running time��%.4f s" % (time.time() - time_s))
        path_default = os.path.join(os.path.expanduser("~"), 'Desktop')
        if not os.path.isdir(path):
            path = path_default
        csv_filename = "�������顿[" + table.split("_")[
            -1] + "_" + category + "_Top500" + "]" + variable + "_" + datetime.datetime.strftime(date, "%m%d") + "-" \
                       + str(length) + "_" + SQL + ".csv"
        try:
            df.to_csv(path + "\\" + csv_filename)
            print("> ���CSV�ļ���", path, ",", csv_filename)
        except Exception as e:
            print("> ���CSV�ļ�ʧ�ܣ�����ԭ��", e)


def xiaobaods_al(SQL_msg="", cid="", category="ţ�п�", SQL="xiaobaods", table="bc_attribute_granularity_sales",
                fillna="", debug=0, path=""):
    '''
    # 2017-11-06 For Spring.2018
    '''
    cid = str(cid)
    if not cid:
        return None
    if not SQL_msg:
        return None
    time_s = time.time()
    latest_date = datetime.datetime.today().date() - datetime.timedelta(1)
    if category not in ["ţ�п�", "��׿�", "���п�"]:
        category = "ţ�п�"
    if SQL not in SQL_msg:
        SQL = SQL_msg[0]
    if table not in ["bc_attribute_granularity_sales", "bc_attribute_granularity_visitor"]:
        table = "bc_attribute_granularity_sales"
    if table == "bc_attribute_granularity_sales":
        sql_select = "SELECT `����`,`��������`,`��Ʒ��Ϣ`,`֧���Ӷ�����`,`������������`,`֧��ת����ָ��`,`��ͼ����ͼ` FROM " + table + \
                       " where `��Ŀ`='" + category + "' AND `��������` like '%id=" + cid + "';"
    elif table == "bc_attribute_granularity_visitor":
        sql_select = "SELECT `����`,`��������`,`��Ʒ��Ϣ`,`����ָ��`,`��������`,`֧���Ӷ�����`,`��ͼ����ͼ` FROM " + table + \
                       " where `��Ŀ`='" + category + "' AND `��������` like '%id=" + cid + "';"
    # read msg from Mysql
    conn = pymysql.connect(host=SQL_msg[SQL]["host"], port=int(SQL_msg[SQL]["port"]), user=SQL_msg[SQL]["user"],
                            passwd=SQL_msg[SQL]["passwd"], charset=SQL_msg[SQL]["charset"], db=SQL_msg[SQL]["db"])
    df = pd.read_sql_query(sql_select, conn)
    conn.close()
    # def-timeline

    def creation_date_list(min, max):
        date_list = []
        date = min
        while date != max + datetime.timedelta(1):
            date_list.append(date)
            date += datetime.timedelta(1)
        return date_list
    # sort
    df.sort_values(by=["����"], inplace=True)
    # �ظ����
    df["��Ʒ��Ϣ"] = df["��Ʒ��Ϣ"].apply(lambda s: s.split(" �۸�")[0])
    df.loc[df["��ͼ����ͼ"].duplicated(keep="first")==True, "��ͼ����ͼ"] = np.nan
    df.loc[df["��Ʒ��Ϣ"].duplicated(keep="first")==True, "��Ʒ��Ϣ"] = np.nan
    # ʱ��������չ
    date_list = creation_date_list(min(df["����"]), max(df["����"]))
    df1 = pd.DataFrame(date_list, columns=["����"])
    df = pd.merge(df1, df, how="outer", left_on="����", right_on="����")
    # ʱ�����п��ƴ���
    df.loc[:, "��������"].fillna(501, inplace=True)
    if fillna == "":
        df.loc[:, "��Ʒ��Ϣ"].fillna("-", inplace=True)
        df.loc[:, "��ͼ����ͼ"].fillna("-", inplace=True)
    else:
        df.loc[:, "��Ʒ��Ϣ"].fillna(fillna, inplace=True)
        df.loc[:, "��ͼ����ͼ"].fillna(fillna, inplace=True)
    df.fillna(0, inplace=True)
    if debug not in [1, 2, 8, 9]:
        print(df.to_json(orient="index"))
    elif debug == 8:
        return df
    elif debug == 1 or debug == 2:
        print("- Running time��%.4f s" % (time.time() - time_s))
        print("- cid��%r \n- category��%r \n- SQL��%r \n- table: %r \n- variable��%r"
              " \n- debug��%r \n- path: %r" % (cid, category, SQL, table, debug, path))
    elif debug == 9:
        import os
        print("- Running time��%.4f s" % (time.time() - time_s))
        path_default = os.path.join(os.path.expanduser("~"), 'Desktop')
        if not os.path.isdir(path):
            path = path_default
        csv_filename = "�������顿[" + table.split("_")[
            -1] + "_ID:" + cid + "_Top500_Data" + "]" + datetime.datetime.strftime(datetime.date.today(),"%Y-%m-%d") + \
                       "_" + SQL + ".csv"
        try:
            df.to_csv(path + "\\" + csv_filename)
            print("> ���CSV�ļ���", path, ",", csv_filename)
        except Exception as e:
            print("> ���CSV�ļ�ʧ�ܣ�����ԭ��", e)


def xiaobaods_c(SQL_msg="", line_b=0, line_f=20, date="", category="ţ�п�", classification="��ʽ", attributes="Ǧ�ʿ�",
                length=7, SQL="xiaobaods",
                table="bc_attribute_granularity_sales", variable="��������", fillna="", debug=0, path="", keyword="���ڣ�",
                rankl=0, rankm=0, titler="", storer="", v1l=0, v1m=0, v2l=0, v2m=0, v3l=0, v3m=0):
    '''
    # 2017-10-18 All rewrite
    '''
    if not SQL_msg:
        return None
    if line_b > line_f:
        line_b, line_f = line_f, line_b
    time_s = time.time()
    latest_date = datetime.datetime.today().date() - datetime.timedelta(1)
    if (category not in goal) or (classification not in goal[category]) or \
            (attributes not in goal[category][classification]):
        category = "ţ�п�"
        classification = "��ʽ"
        attributes = "Ǧ�ʿ�"
    if length > 14 or length < 3:
        length = 7
    if SQL not in SQL_msg:
        SQL = SQL_msg[0]
    table = "bc_category_granularity"
    sql_select_f = "SELECT CT.`��ͼ����ͼ`,CT.`��������`,CT.`��Ʒ��Ϣ`,CT.`��������`,CT.`֧���Ӷ�����`,CT.`֧������`," \
                   "CT.`֧��ת����ָ��`,CT.`��������`,CT.`��������`,CT.`�鿴����`"
    if date == "":
        date = latest_date
    else:
        date = parse(date).date()  # �޸����ڸ�ʽ
    if variable not in ["��������", "֧���Ӷ�����", "֧������", "֧��ת����ָ��"]:
        variable = "��������"
    # Try to connect with the mysql and back a date which minimum.
    try:
        conn = pymysql.connect(host=SQL_msg[SQL]["host"], port=int(SQL_msg[SQL]["port"]), user=SQL_msg[SQL]["user"],
                               passwd=SQL_msg[SQL]["passwd"], charset=SQL_msg[SQL]["charset"], db=SQL_msg[SQL]["db"])
        cursor = conn.cursor()
        cursor.execute("SELECT min(`����`),max(`����`) from "+table+" where `��Ŀ`='"+category+"' "
                                                        "and `����`='"+classification+"' and `����`='"+attributes+"';")
        date_limit = cursor.fetchall()
        date_floor = date_limit[0][0]
        date_ceiling = date_limit[0][1]
        cursor.close()
        conn.close()
    except Exception as e:
        return e
    if date > latest_date:
        date = latest_date
    if date > date_ceiling:
        date = date_ceiling
    if date < date_floor + datetime.timedelta (length - 1):
        date = date_floor + datetime.timedelta(length - 1)
    # Main program.
    sql_select_m = ""
    for i in range(length):
        sql_select_m += ",MAX(CASE ST.���� WHEN " + str(date - datetime.timedelta(length - i - 1)).replace("-",
                                                "") + " THEN ST." + variable + " ELSE NULL END) AS `���ڣ�" + str(
            date - datetime.timedelta(length - i - 1)).replace("-", "") + "` "
    sql_select_re = ""
    if 0 < rankl <= 500:
        sql_select_re += " AND CT.`��������`>=" + str(rankl)
    if 0 < rankm <= 500:
        sql_select_re += " AND CT.`��������`<=" + str(rankm)
    if titler:
        sql_select_re += " AND CT.`��Ʒ��Ϣ` REGEXP('" + titler + "')"
    if storer:
        sql_select_re += " AND CT.`��������` REGEXP('" + storer + "')"
    if v1l != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[4] + "<=" + str(v1l)
    if v1m != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[4] + ">=" + str(v1m)
    if v2l != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[5] + "<=" + str(v2l)
    if v2m != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[5] + ">=" + str(v2m)
    if v3l != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[6] + "<=" + str(v3l)
    if v3m != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[6] + ">=" + str(v3m)
    sql_select_b = "FROM " + table + " AS CT LEFT JOIN " + table + " AS ST ON CT.`��������` = ST.`��������` " \
                                                                   "WHERE CT.`����` = " + str(date).replace("-", "") \
            + " AND CT.��Ŀ = '" + category + "' AND CT.���� = '"+classification+"' AND CT.���� = '"+attributes+"' " \
                "AND ST.���� >= " + str(date - datetime.timedelta(length)).replace("-", "") + " AND " \
        "ST.��Ŀ = '" + category + "' AND ST.���� = '"+classification+"' AND ST.���� = '"+attributes+"'" + sql_select_re
    sql_select_e = " GROUP BY CT.`��������`,CT.`" + variable + "` ORDER BY CT.`��������` LIMIT " + str(line_b) + ","\
                   + str(line_f-line_b) + ";"
    sql_select_c = "SELECT COUNT(*) AS total FROM " + table + " AS CT WHERE CT.`����` = " + str(date).replace("-", "") \
            + " AND CT.��Ŀ = '" + category + " 'AND CT.���� = '"+classification+"' AND CT.���� = '"+attributes+"'" + \
                   sql_select_re + ";"
    # read msg from Mysql
    conn = pymysql.connect(host=SQL_msg[SQL]["host"], port=int(SQL_msg[SQL]["port"]), user=SQL_msg[SQL]["user"],
                            passwd=SQL_msg[SQL]["passwd"], charset=SQL_msg[SQL]["charset"], db=SQL_msg[SQL]["db"])
    total = pd.read_sql_query(sql_select_c, conn).iloc[0, 0]
    df = pd.read_sql_query(sql_select_f + sql_select_m + sql_select_b + sql_select_e, conn)
    df["total"] = total
    conn.close()
    if fillna == "bd":
        df = df.fillna(method="bfill", limit=1, axis=1)
        df.dropna(inplace=True)
    elif fillna == "drop":
        df.dropna(inplace=True)
    elif fillna == "":
        pass
    else:
        df = df.fillna(fillna)
    if debug not in [1, 2, 8, 9]:
        print(df.to_json(orient="index"))
    elif debug == 8:
        return df
    elif debug == 2:
        print("- Running time��%.4f s" % (time.time() - time_s))
        print("- date��%r \n- category��%r \n- classification: %r \n- attributes: %r \n- length��%r \n- page: %r(%r-%r) "
              "\n- SQL��%r \n- table: %r \n- variable��%r"
              " \n- debug��%r \n- path: %r\n- keyword: %r" % (str(date), category, classification, attributes,
                                                             str(length), total, line_b, line_f, SQL,
                                                          table, variable, debug, path, keyword))
    elif debug == 1:
        print("- Running time��%.4f s" % (time.time() - time_s))
        print("  SQL_choice: %r \n- category: %r \n- classification: %r \n- attributes: %r \n- length: %r \n- date: %r "
              "\n- total_SQL: %r \n- SQL: %r" %
                (SQL, category, classification, attributes, str(length), str(date), sql_select_c, sql_select_f +
                 sql_select_m + sql_select_b + sql_select_e))
    elif debug == 9:
        import os
        print ("- Running time��%.4f s" % (time.time()-time_s))
        path_default = os.path.join(os.path.expanduser("~"), 'Desktop')
        if not os.path.isdir(path):
            path = path_default
        csv_filename = "�������顿["+table.split("_")[1]+"_"+category+"_"+classification+"_"+attributes+"]"+variable+"_"\
                     + datetime.datetime.strftime(date, "%m%d")+"-"+str(length)+"_"+SQL+".csv"
        try:
            df.to_csv(path+"\\"+csv_filename)
            print("> ���CSV�ļ���", path, ",", csv_filename)
        except Exception as e:
            print("> ���CSV�ļ�ʧ�ܣ�����ԭ��", e)


def xiaobaods_w(SQL_msg="", line_b=0, line_f=20, date="", category="ţ�п�", length=7,SQL="xiaobaods",choice="���Ѻ��Ĵ�",
                variable="����", fillna="", debug=0, path="", keyword="���ڣ�", rankl=0, rankm=0, titler="",
                v1l=0, v1m=0, v2l=0, v2m=0, v3l=0, v3m=0, v4l=0, v4m=0, v5l=0, v5m=0, v6l=0, v6m=0):
    '''
    # 2017-10-19 All rewrite
    '''
    if line_b > line_f:
        line_b, line_f = line_f, line_b
    time_s = time.time()
    latest_date = datetime.datetime.today().date()-datetime.timedelta(1)
    if category not in ["ţ�п�", "��׿�", "���п�"]:
        category = "ţ�п�"
    if length > 30 or length < 3:
        length = 7
    if SQL not in SQL_msg:
        SQL = SQL_msg[0]
    if choice not in choice_list:
        choice = "�������δ�"
    if variable not in choice_list[choice]["variable"]:
        variable = "����"
    if date == "":
        date = latest_date
    else:
        date = parse(date).date()  # �޸����ڸ�ʽ
    # Try to connect with the mysql and back a date which minimum.
    try:
        conn = pymysql.connect(host=SQL_msg[SQL]["host"], port=int(SQL_msg[SQL]["port"]), user=SQL_msg[SQL]["user"],
                               passwd=SQL_msg[SQL]["passwd"],
                               charset=SQL_msg[SQL]["charset"], db=SQL_msg[SQL]["db"])
        cursor = conn.cursor()
        cursor.execute("SELECT min(`����`),max(`����`) from " + choice_list[choice]["table"] + " where `��Ŀ`='" +
                       category + "' and `�ֶ�`='" + choice + "';")
        date_limit = cursor.fetchall()
        date_floor = date_limit[0][0]
        date_ceiling = date_limit[0][1]
        cursor.close()
        conn.close()
    except Exception as e:
        return e
    if date > latest_date:
        date = latest_date
    if date > date_ceiling:
        date = date_ceiling
    if date < date_floor + datetime.timedelta(length-1):
        date = date_floor + datetime.timedelta(length-1)
    # Main program.
    sql_select_f = "SELECT CT.`����`,CT.`������`"
    for i in range(len(choice_list[choice]["variable"])):
        sql_select_f += ",CT.`"+choice_list[choice]["variable"][i]+"`"
    sql_select_m = ""
    for i in range(length):
        sql_select_m += ",MAX(CASE ST.���� WHEN " + str(date - datetime.timedelta(length-i-1)).replace("-", "") + \
                        " THEN ST." + variable + " ELSE NULL END) AS `" + keyword + \
                        str(date - datetime.timedelta(length-i-1)).replace("-", "")+"` "
    sql_select_re = ""
    if 0 < rankl <= 500:
        sql_select_re += " AND CT.`����`>=" + str(rankl)
    if 0 < rankm <= 500:
        sql_select_re += " AND CT.`����`<=" + str(rankm)
    if titler:
        sql_select_re += " AND CT.`������` REGEXP('" + titler + "')"
    if v1l != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[2] + "<=" + str(v1l)
    if v1m != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[2] + ">=" + str(v1m)
    if v2l != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[3] + "<=" + str(v2l)
    if v2m != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[3] + ">=" + str(v2m)
    if v3l != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[4] + "<=" + str(v3l)
    if v3m != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[4] + ">=" + str(v3m)
    if v4l != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[5] + "<=" + str(v4l)
    if v4m != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[5] + ">=" + str(v4m)
    if v5l != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[6] + "<=" + str(v5l)
    if v5m != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[6] + ">=" + str(v5m)
    if v6l != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[7] + "<=" + str(v6l)
    if v6m != 0:
        sql_select_re += " AND " + sql_select_f.split(",")[7] + ">=" + str(v6m)
    sql_select_b = "FROM " + choice_list[choice]["table"] + " AS CT LEFT JOIN " + choice_list[choice]["table"] + \
                   " AS ST ON CT.������ = ST.������ WHERE CT.`����` = "+str(date).replace("-", "")+" AND CT.��Ŀ = '" + \
                   category + "' AND CT.�ֶ�='"+choice + "' AND ST.�ֶ�='" + choice + "' AND ST.���� >= " + \
                   str(date - datetime.timedelta(length)).replace("-", "") + " AND ST.��Ŀ = '" + category + "'" + \
                   sql_select_re
    sql_select_e = " GROUP BY CT.`����`,CT.`" + variable + "` ORDER BY CT.`����` LIMIT " + str(line_b) + ","\
                   + str(line_f-line_b) + ";"
    sql_select_c = "SELECT COUNT(*) AS total FROM " + choice_list[choice]["table"] + " AS CT WHERE CT.`����` = " + str(date).replace("-", "") \
            + " AND CT.��Ŀ = '" + category + "' AND CT.�ֶ�='" + choice + "'" + sql_select_re + ";"
    # Return parameter
    if debug == 7:
        return {"SQL_choice": SQL, "category": category, "length": str(length), "date": str(date), "SQL":
            sql_select_f + sql_select_m + sql_select_e, "choice": choice, "table": choice_list[choice]["table"],
                "variable": variable, "fillna": fillna, "debug": debug, "path": path}
    # read msg from Mysql
    conn = pymysql.connect(host=SQL_msg[SQL]["host"], port=int(SQL_msg[SQL]["port"]), user=SQL_msg[SQL]["user"],
                           passwd=SQL_msg[SQL]["passwd"], charset=SQL_msg[SQL]["charset"], db=SQL_msg[SQL]["db"])
    total = pd.read_sql_query(sql_select_c, conn).iloc[0, 0]
    df = pd.read_sql_query(sql_select_f + sql_select_m + sql_select_b + sql_select_e, conn)
    df["total"] = total
    conn.close()
    if fillna == "bd":
        df = df.fillna(method="bfill", limit=1, axis=1)
        df.dropna(inplace=True)
    elif fillna == "drop":
        df.dropna(inplace=True)
    elif fillna == "":
        pass
    else:
        df = df.fillna(fillna)
    # Debug
    if debug not in [1, 2, 8, 9]:
        print(df.to_json(orient="index"))
    elif debug == 1:
        print("- Running time��%.4f s" % (time.time()-time_s))
        print("  SQL_choice: %r \n- category: %r \n- length: %r \n- date: %r\n- total_SQL: %r \n- SQL: %r" %
              (SQL, category, str(length), str(date), sql_select_c, sql_select_f + sql_select_m +
               sql_select_b + sql_select_e))
    elif debug == 2:
        print("- Running time��%.4f s" % (time.time()-time_s))
        print("- date��%r \n- category��%r \n- length��%r \n- SQL��%r \n- choice: %r \n- table: %r \n- variable��%r \n"
              "- fillna: %r \n- debug��%r \n- path: %r\n- keyword: %r" % (str(date), category, str(length), SQL, choice,
                                            choice_list[choice]["table"], variable, fillna, debug, path, keyword))
    elif debug == 8:
        return df
    elif debug == 9:
        import os
        print("- Running time��%.4f s" % (time.time()-time_s))
        path_default = os.path.join(os.path.expanduser("~"), 'Desktop')
        if not os.path.isdir(path):
            path = path_default
        csv_filename = "�������顿["+choice_list[choice]["table"].split("_")[-1] + "_" + category + "_" + choice + "]" + \
                     variable + "_" + datetime.datetime.strftime(date, "%m%d") + "-" + str(length) + "_" + SQL + ".csv"
        try:
            df.to_csv(path+"\\"+csv_filename)
            print("> ���CSV�ļ���", path, ",", csv_filename)
        except Exception as e:
            print("> ���CSV�ļ�ʧ�ܣ�����ԭ��", e)

