USE [master]
GO
/****** Object:  Database [TTCECSTEST]    Script Date: 11-Dec-25 12:05:15 PM ******/
CREATE DATABASE [TTCECSTEST]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TTCECS', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\TTCECSTEST.mdf' , SIZE = 1808384KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'TTCECS_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\TTCECSTEST_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [TTCECSTEST] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TTCECSTEST].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TTCECSTEST] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TTCECSTEST] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TTCECSTEST] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TTCECSTEST] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TTCECSTEST] SET ARITHABORT OFF 
GO
ALTER DATABASE [TTCECSTEST] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TTCECSTEST] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [TTCECSTEST] SET AUTO_SHRINK ON 
GO
ALTER DATABASE [TTCECSTEST] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TTCECSTEST] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TTCECSTEST] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TTCECSTEST] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TTCECSTEST] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TTCECSTEST] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TTCECSTEST] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TTCECSTEST] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TTCECSTEST] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TTCECSTEST] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TTCECSTEST] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TTCECSTEST] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TTCECSTEST] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TTCECSTEST] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TTCECSTEST] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TTCECSTEST] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [TTCECSTEST] SET  MULTI_USER 
GO
ALTER DATABASE [TTCECSTEST] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TTCECSTEST] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TTCECSTEST] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TTCECSTEST] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [TTCECSTEST]
GO
/****** Object:  StoredProcedure [dbo].[FD_Intrest_payment_CASH]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
--exec FD_Intrest_payment_CASH 'admin','Anna Nagar','C.D.A/C CanaraBank 130','Cash Dina:(2000 * 106+500 * 1+100 * 3+50 * 1+10 * 2+Coins: 9 )'
-- =============================================
CREATE PROCEDURE [dbo].[FD_Intrest_payment_CASH]
@Loginid nvarchar(max),
@BranchName nvarchar(max),
@txtBank nvarchar(max),
@DBChqNo nvarchar(max)
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @row int=0
	declare @query nvarchar(max)
	declare @lastdt nvarchar(10)
	set @lastdt=dateadd(day,-1,dateadd(month,1,cast(substring(convert(varchar(10),getdate(),120),1,8)+'01' as date)))
	declare @prevAccno nvarchar(100)=''
	declare @prevFDMno nvarchar(100)=''
	declare @RTNo int
		Select top 1 @RTNo=IsNull(max(dbRtNo),0)+1 from MMB_DayBook where dbRemarks Like 'frmVou%' and dbPayRec='Payment' and  dbTranDt>=(select  from_dt from gen_mas_accountingyear where cast(GETDATE() as date) between from_dt and To_dt)
	if (right(@lastdt,2)='30')
	begin
		declare cur cursor for select fdACName as Name,fdMno,fdNo as FDNo,convert(nvarchar(10),fdDt,105) as Date,fdAmt as Amount,fdROI as ROI, convert(nvarchar(10),fdLICDt,105) as LICdt,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI,substring(fdACNo,charindex('-',fdAcNo,1)+1,20) as BankACNo,substring(fdACNo,0,charindex('-',fdAcNo,0) )as ifsc,fdAcNo,case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end descr from mmb_mas_FixedDeposit a where MOP like'%cash%' and fdStatus='L' and fdlicdt!=@lastdt   order by fdmno,fdACName, fdACNo
		end 
		if(right(@lastdt,2)='31')
		begin
		print @lastdt    
				declare cur cursor for select fdACName as Name,fdMno,fdNo as FDNo,convert(nvarchar(10),fdDt,105) as Date,fdAmt as Amount,fdROI as ROI, convert(nvarchar(10),fdLICDt,105) as LICdt,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI,substring(fdACNo,charindex('-',fdAcNo,1)+1,20) as BankACNo,substring(fdACNo,0,charindex('-',fdAcNo,0) )as ifsc,fdAcNo,case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end descr from mmb_mas_FixedDeposit a where MOP like'%cash%' and fdStatus='L' and fdlicdt!=@lastdt   order by fdmno,fdACName, fdACNo
		end
		if (right(@lastdt,2)='28')
	begin
		declare cur cursor for select fdACName as Name,fdMno,fdNo as FDNo,convert(nvarchar(10),fdDt,105) as Date,fdAmt as Amount,fdROI as ROI, convert(nvarchar(10),fdLICDt,105) as LICdt,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI,substring(fdACNo,charindex('-',fdAcNo,1)+1,20) as BankACNo,substring(fdACNo,0,charindex('-',fdAcNo,0) )as ifsc,fdAcNo,case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end descr from mmb_mas_FixedDeposit a where MOP like'%cash%' and fdStatus='L' and fdlicdt!=@lastdt   order by fdmno,fdACName, fdACNo
		end 
		if (right(@lastdt,2)='29')
	begin
		declare cur cursor for select fdACName as Name,fdMno,fdNo as FDNo,convert(nvarchar(10),fdDt,105) as Date,fdAmt as Amount,fdROI as ROI, convert(nvarchar(10),fdLICDt,105) as LICdt,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI,substring(fdACNo,charindex('-',fdAcNo,1)+1,20) as BankACNo,substring(fdACNo,0,charindex('-',fdAcNo,0) )as ifsc,fdAcNo,case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end descr from mmb_mas_FixedDeposit a where MOP like'%cash%' and fdStatus='L' and fdlicdt!=@lastdt   order by fdmno,fdACName, fdACNo
		end 
	open cur
	declare @fdacname nvarchar(20),@fdmno nvarchar(20),@fdno nvarchar(20),@date nvarchar(20),@Amount nvarchar(20),@roi nvarchar(20),@licdt nvarchar(20),@fdi nvarchar(20),@BankACNo nvarchar(100),@ifsc nvarchar(60),@fdAcNo nvarchar(100),@descr nvarchar(20)
	fetch next from cur into  @fdacname,@fdmno,@fdno,@date,@Amount,@roi,@licdt,@fdi,@BankACNo,@ifsc,@fdAcNo,@descr
	while(@@Fetch_status=0)

	begin
		set @row=@row+1
		print @row
		declare @remarks nvarchar(max)
		if not  ( @prevFDMno=@fdmno )
		begin
			set @RTNo=@RTNo+1
		end
		print cast(@row as nvarchar(100))+' '+@fdacno+' '+cast(@fdmno as nvarchar(100))+'prev '+@prevaccno+'prev '+cast(@prevfdmno as nvarchar(100))+' '+cast(@Rtno as nvarchar(100))
		select @remarks= isnull( 'frmVou:'+ (select emp_no from Gen_mas_login where Login_id=@LoginId) +':' + cast(format((isnull(Max(Substring(dbRemarks,11,6)),0 )+ 1),'000000')as nvarchar(10))+':'+(select branch_id from mmb_branchdetails where Branch_Name=@BranchName ),'0') from mmb_daybook
		
		insert MMB_DayBook(dbTranDt,dbEDPNo,dbParticular,dbAmt,dbModeOfPay,dbChqNo,dbPayRec,dbRemarks,dbHead,dbRTNo) values(convert(varchar(10),getdate(),120),@fdmno,'FD N.o:' + @fdno+ '-' +@Amount + '@'+ @ROI +'-' +@descr,@fdi,'Cash',@DBChqNo,'Payment',@remarks,'Interest on F.D',@RTNo)--,@fdno,@date,@Amount,@roi,@licdt,@fdi,@BankACNo,@ifsc,@fdAcNo,@descr)
		
				set @prevAccno=@fdAcNo
		set @prevFDMno=@fdmno
		fetch next from cur into  @fdacname,@fdmno,@fdno,@date,@Amount,@roi,@licdt,@fdi,@BankACNo,@ifsc,@fdAcNo,@descr
	end
    -- Insert statements for procedure here
	close cur
	deallocate cur

		
print 'daybook'

		update mmb_mas_FixedDeposit set fdLICDt=@lastdt where MOP like'%cash%' and fdStatus='L' and fdno in (select fdno from mmb_mas_FixedDeposit a where MOP like'%cash%' and fdStatus='L' and fdlicdt!=@lastdt)
		

	--print 'rtgs'
END

GO
/****** Object:  StoredProcedure [dbo].[FD_Intrest_payment_RD]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
--exec FD_Intrest_payment_RD 'admin','Anna Nagar','C.D.A/C CanaraBank 130','Cash Dina:(2000 * 106+500 * 1+100 * 3+50 * 1+10 * 2+Coins: 9 )'
-- =============================================
CREATE PROCEDURE [dbo].[FD_Intrest_payment_RD]
@Loginid nvarchar(max),
@BranchName nvarchar(max),
@txtBank nvarchar(max),
@DBChqNo nvarchar(max)
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @row int=0
	declare @query nvarchar(max)
	declare @lastdt nvarchar(10)
	set @lastdt=dateadd(day,-1,dateadd(month,1,cast(substring(convert(varchar(10),getdate(),120),1,8)+'01' as date)))
	declare @prevAccno nvarchar(100)=''
	declare @prevFDMno nvarchar(100)=''
	declare @RTNo int
	declare @RmNo int
		Select top 1 @RTNo=IsNull(max(dbRtNo),0)+1 from MMB_DayBook where dbRemarks Like 'frmVou%' and dbPayRec='Payment' and  dbTranDt>=(select  from_dt from gen_mas_accountingyear where cast(GETDATE() as date) between from_dt and To_dt)
		Select top 1 @RmNo=IsNull(max(dbRtNo),0)+1 from MMB_DayBook where dbRemarks Like 'frmrec%' and dbPayRec='Payment' and  dbTranDt>=(select  from_dt from gen_mas_accountingyear where cast(GETDATE() as date) between from_dt and To_dt)
	if (right(@lastdt,2)='31')
	begin
		declare cur cursor for select fdACName as Name,fdMno,fdNo as FDNo,convert(nvarchar(10),fdDt,105) as Date,fdAmt as Amount,fdROI as ROI, convert(nvarchar(10),fdLICDt,105) as LICdt,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI,substring(fdACNo,charindex('-',fdAcNo,1)+1,20) as BankACNo,substring(fdACNo,0,charindex('-',fdAcNo,0) )as ifsc,fdAcNo,case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end descr,fdRemarks rdno from mmb_mas_FixedDeposit a where MOP like'%RD Adjustment%' and fdStatus='L' and fdlicdt!=@lastdt   order by fdmno,fdACName, fdACNo
		end 
		if(right(@lastdt,2)='30')
		begin
		print @lastdt
				declare cur cursor for select fdACName as Name,fdMno,fdNo as FDNo,convert(nvarchar(10),fdDt,105) as Date,fdAmt as Amount,fdROI as ROI, convert(nvarchar(10),fdLICDt,105) as LICdt,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI,substring(fdACNo,charindex('-',fdAcNo,1)+1,20) as BankACNo,substring(fdACNo,0,charindex('-',fdAcNo,0) )as ifsc,fdAcNo,case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end descr,fdRemarks rdno from mmb_mas_FixedDeposit a where MOP like'%RD Adjustment%' and fdStatus='L' and fdlicdt!=@lastdt   order by fdmno,fdACName, fdACNo
		end
		if (right(@lastdt,2)='29')
	begin
		declare cur cursor for select fdACName as Name,fdMno,fdNo as FDNo,convert(nvarchar(10),fdDt,105) as Date,fdAmt as Amount,fdROI as ROI, convert(nvarchar(10),fdLICDt,105) as LICdt,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI,substring(fdACNo,charindex('-',fdAcNo,1)+1,20) as BankACNo,substring(fdACNo,0,charindex('-',fdAcNo,0) )as ifsc,fdAcNo,case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end descr,fdRemarks rdno from mmb_mas_FixedDeposit a where MOP like'%RD Adjustment%' and fdStatus='L' and fdlicdt!=@lastdt   order by fdmno,fdACName, fdACNo
		end 
		if (right(@lastdt,2)='28')
	begin
		declare cur cursor for select fdACName as Name,fdMno,fdNo as FDNo,convert(nvarchar(10),fdDt,105) as Date,fdAmt as Amount,fdROI as ROI, convert(nvarchar(10),fdLICDt,105) as LICdt,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI,substring(fdACNo,charindex('-',fdAcNo,1)+1,20) as BankACNo,substring(fdACNo,0,charindex('-',fdAcNo,0) )as ifsc,fdAcNo,case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end descr,fdRemarks rdno from mmb_mas_FixedDeposit a where MOP like'%RD Adjustment%' and fdStatus='L' and fdlicdt!=@lastdt   order by fdmno,fdACName, fdACNo
		end 
	open cur
	declare @fdacname nvarchar(20),@fdmno nvarchar(20),@fdno nvarchar(20),@date nvarchar(20),@Amount nvarchar(20),@roi nvarchar(20),@licdt nvarchar(20),@fdi nvarchar(20),@BankACNo nvarchar(100),@ifsc nvarchar(60),@fdAcNo nvarchar(100),@descr nvarchar(20),@rdno nvarchar(20)
	fetch next from cur into  @fdacname,@fdmno,@fdno,@date,@Amount,@roi,@licdt,@fdi,@BankACNo,@ifsc,@fdAcNo,@descr,@rdno
	while(@@Fetch_status=0)

	begin
		set @row=@row+1
		print @row
		declare @remarks nvarchar(max)
		if not  ( @prevFDMno=@fdmno )
		begin
			set @RTNo=@RTNo+1
		end
		print cast(@row as nvarchar(100))+' '+@fdacno+' '+cast(@fdmno as nvarchar(100))+'prev '+@prevaccno+'prev '+cast(@prevfdmno as nvarchar(100))+' '+cast(@Rtno as nvarchar(100))
		
		
		select @remarks= isnull( 'frmVou:'+ (select emp_no from Gen_mas_login where Login_id=@LoginId) +':' + cast(format((isnull(Max(Substring(dbRemarks,11,6)),0 )+ 1),'000000')as nvarchar(10))+':'+(select branch_id from mmb_branchdetails where Branch_Name=@BranchName ),'0') from mmb_daybook
		
		insert MMB_DayBook(dbTranDt,dbEDPNo,dbParticular,dbAmt,dbModeOfPay,dbChqNo,dbPayRec,dbRemarks,dbHead,dbRTNo) values(convert(varchar(10),getdate(),120),@fdmno,'FD N.o:' + @fdno+ '-' +@Amount + '@'+ @ROI +'-' +@descr,@fdi,'Adjustment','Tr.to RD No'+@rdno,'Payment',@remarks,'Interest on F.D',@RTNo)--,@fdno,@date,@Amount,@roi,@licdt,@fdi,@BankACNo,@ifsc,@fdAcNo,@descr)

				
		select @remarks= isnull( 'frmRec:'+ (select emp_no from Gen_mas_login where Login_id=@LoginId) +':' + cast(format((isnull(Max(Substring(dbRemarks,11,6)),0 )+ 1),'000000')as nvarchar(10))+':'+(select branch_id from mmb_branchdetails where Branch_Name=@BranchName ),'0') from mmb_daybook

		insert MMB_DayBook(dbTranDt,dbEDPNo,dbParticular,dbAmt,dbModeOfPay,dbChqNo,dbPayRec,dbRemarks,dbHead,dbRTNo) values(convert(varchar(10),getdate(),120),@fdmno,'RD No:'+@rdno,@fdi,'Adjustment','Tr.from FDI No:'+@fdno,'Receipt',@remarks,'Recurring Deposit',@RmNo)--,@fdno,@date,@Amount,@roi,@licdt,@fdi,@BankACNo,@ifsc,@fdAcNo,@descr)
		
				set @prevAccno=@fdAcNo
		set @prevFDMno=@fdmno
		fetch next from cur into  @fdacname,@fdmno,@fdno,@date,@Amount,@roi,@licdt,@fdi,@BankACNo,@ifsc,@fdAcNo,@descr,@rdno
	end
    -- Insert statements for procedure here
	close cur
	deallocate cur

		
print 'daybook'

		update mmb_mas_FixedDeposit set fdLICDt=@lastdt where MOP like'%RD Adjustment%' and fdStatus='L' and fdno in (select fdno from mmb_mas_FixedDeposit a where MOP like'%RD Adjustment%' and fdStatus='L' and fdlicdt!=@lastdt)
		

	--print 'rtgs'
END

GO
/****** Object:  StoredProcedure [dbo].[FD_Intrest_payment_sp]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- exec FD_Intrest_payment_sp 'admin','Anna Nagar','C.D.A/C IDFC Bank 4770'
-- =============================================
CREATE PROCEDURE [dbo].[FD_Intrest_payment_sp]
@Loginid nvarchar(max),
@BranchName nvarchar(max),
@txtBank nvarchar(max)
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @row int=0
	declare @query nvarchar(max)
	declare @lastdt nvarchar(10)
	set @lastdt=dateadd(day,-1,dateadd(month,1,cast(substring(convert(varchar(10),getdate(),120),1,8)+'01' as date)))
	declare @prevAccno nvarchar(100)=''
	declare @prevFDMno nvarchar(100)=''
	declare @RTNo int
		Select top 1 @RTNo=IsNull(max(dbRtNo),0)+1 from MMB_DayBook where dbRemarks Like 'frmVou%' and dbPayRec='Payment' and  dbTranDt>=(select  from_dt from gen_mas_accountingyear where cast(GETDATE() as date) between from_dt and To_dt)
	
	
	if (right(@lastdt,2)='31')
	begin
print @lastdt
print '31'
		declare cur cursor for select fdACName as Name,fdMno,fdNo as FDNo,convert(nvarchar(10),fdDt,105) as Date,fdAmt as Amount,fdROI as ROI, convert(nvarchar(10),fdLICDt,105) as LICdt,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI,substring(fdACNo,charindex('-',fdAcNo,1)+1,20) as BankACNo,substring(fdACNo,0,charindex('-',fdAcNo,0) )as ifsc,fdAcNo,case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end descr from mmb_mas_FixedDeposit a where MOP like'%NEFT%' and fdStatus='L' and fdlicdt!=@lastdt   order by fdmno,fdACName, fdACNo
		end 
		if(right(@lastdt,2)='30')
		begin
		
				declare cur cursor for select fdACName as Name,fdMno,fdNo as FDNo,convert(nvarchar(10),fdDt,105) as Date,fdAmt as Amount,fdROI as ROI, convert(nvarchar(10),fdLICDt,105) as LICdt,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI,substring(fdACNo,charindex('-',fdAcNo,1)+1,20) as BankACNo,substring(fdACNo,0,charindex('-',fdAcNo,0) )as ifsc,fdAcNo,case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end descr from mmb_mas_FixedDeposit a where MOP like'%NEFT%' and fdStatus='L' and fdlicdt!=@lastdt   order by fdmno,fdACName, fdACNo
		end
		if (right(@lastdt,2)='28')
	begin
		declare cur cursor for select fdACName as Name,fdMno,fdNo as FDNo,convert(nvarchar(10),fdDt,105) as Date,fdAmt as Amount,fdROI as ROI, convert(nvarchar(10),fdLICDt,105) as LICdt,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI,substring(fdACNo,charindex('-',fdAcNo,1)+1,20) as BankACNo,substring(fdACNo,0,charindex('-',fdAcNo,0) )as ifsc,fdAcNo,case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end descr from mmb_mas_FixedDeposit a where MOP like'%NEFT%' and fdStatus='L' and fdlicdt!=@lastdt   order by fdmno,fdACName, fdACNo
		end 
		if (right(@lastdt,2)='29')
	begin
		declare cur cursor for select fdACName as Name,fdMno,fdNo as FDNo,convert(nvarchar(10),fdDt,105) as Date,fdAmt as Amount,fdROI as ROI, convert(nvarchar(10),fdLICDt,105) as LICdt,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI,substring(fdACNo,charindex('-',fdAcNo,1)+1,20) as BankACNo,substring(fdACNo,0,charindex('-',fdAcNo,0) )as ifsc,fdAcNo,case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end descr from mmb_mas_FixedDeposit a where MOP like'%NEFT%' and fdStatus='L' and fdlicdt!=@lastdt   order by fdmno,fdACName, fdACNo
		end 
	open cur
	declare @fdacname nvarchar(20),@fdmno nvarchar(20),@fdno nvarchar(20),@date nvarchar(20),@Amount nvarchar(20),@roi nvarchar(20),@licdt nvarchar(20),@fdi nvarchar(20),@BankACNo nvarchar(100),@ifsc nvarchar(60),@fdAcNo nvarchar(100),@descr nvarchar(20)
	fetch next from cur into  @fdacname,@fdmno,@fdno,@date,@Amount,@roi,@licdt,@fdi,@BankACNo,@ifsc,@fdAcNo,@descr
	while(@@Fetch_status=0)
	begin
print @fdno
print @fdi
		set @row=@row+1
		print @row
		declare @remarks nvarchar(max)
		if not  (@prevAccno=@fdAcNo and @prevFDMno=@fdmno )
		begin
			set @RTNo=@RTNo+1
		end
		print cast(@row as nvarchar(100))+' '+@fdacno+' '+cast(@fdmno as nvarchar(100))+'prev '+@prevaccno+'prev '+cast(@prevfdmno as nvarchar(100))+' '+cast(@Rtno as nvarchar(100))
		select @remarks= isnull( 'frmVou:'+ (select emp_no from Gen_mas_login where Login_id=@LoginId) +':' + cast(format((isnull(Max(Substring(dbRemarks,11,6)),0 )+ 1),'000000')as nvarchar(10))+':'+(select branch_id from mmb_branchdetails where Branch_Name=@BranchName ),'0') from mmb_daybook

		insert MMB_DayBook(dbTranDt,dbEDPNo,dbParticular,dbAmt,dbModeOfPay,dbChqNo,dbPayRec,dbRemarks,dbHead,dbRTNo) values(convert(varchar(10),getdate(),120),@fdmno,'FD N.o:' + @fdno+ '-' +@Amount + '@'+ @ROI +'-' +@descr,@fdi,'Adjustment',@fdacno,'Payment',@remarks,'Interest on F.D',@RTNo)--,@fdno,@date,@Amount,@roi,@licdt,@fdi,@BankACNo,@ifsc,@fdAcNo,@descr)
		insert MMB_DayBook(dbTranDt,dbEDPNo,dbParticular,dbAmt,dbModeOfPay,dbChqNo,dbPayRec,dbRemarks,dbHead,dbRTNo) values(convert(varchar(10),getdate(),120),@fdmno,'Cash from Bank',@fdi,'Adjustment',@fdacno,'Receipt',@remarks,@txtBank,@RTNo)
		
		set @prevAccno=@fdAcNo
		set @prevFDMno=@fdmno
		fetch next from cur into  @fdacname,@fdmno,@fdno,@date,@Amount,@roi,@licdt,@fdi,@BankACNo,@ifsc,@fdAcNo,@descr
	end
    -- Insert statements for procedure here
	close cur
	deallocate cur
	if (right(@lastdt,2)='30')
	begin
		declare cur cursor for select (select top 1 fdACName from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),fdmno,(select top 1 fdNo from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 convert(nvarchar(10),fdDt,105) from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 fdAmt from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 fdROI from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 convert(nvarchar(10),fdLICDt,105) from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),sum(fdi),substring(fdACNo,charindex('-',fdAcNo,1)+1,20) ,substring(fdACNo,0,charindex('-',fdAcNo,0) ),(select top 1 fdacno from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end  from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno) from (select fdMno,fdAcNo as FDAcNo,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI from mmb_mas_FixedDeposit a where MOP like'%NEFT%' and fdStatus='L' and fdlicdt!=@lastdt   ) z group by fdmno,fdacno order by fdmno, fdacno
		end  
		if (right(@lastdt,2)='31')
	begin
		declare cur cursor for select (select top 1 fdACName from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),fdmno,(select top 1 fdNo from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 convert(nvarchar(10),fdDt,105) from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 fdAmt from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 fdROI from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 convert(nvarchar(10),fdLICDt,105) from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),sum(fdi),substring(fdACNo,charindex('-',fdAcNo,1)+1,20) ,substring(fdACNo,0,charindex('-',fdAcNo,0) ),(select top 1 fdacno from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end  from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno) from (select fdMno,fdAcNo as FDAcNo,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI from mmb_mas_FixedDeposit a where MOP like'%NEFT%' and fdStatus='L' and fdlicdt!=@lastdt   ) z group by fdmno,fdacno order by fdmno, fdacno
		end
		if (right(@lastdt,2)='28')
	begin
		declare cur cursor for select (select top 1 fdACName from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),fdmno,(select top 1 fdNo from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 convert(nvarchar(10),fdDt,105) from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 fdAmt from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 fdROI from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 convert(nvarchar(10),fdLICDt,105) from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),sum(fdi),substring(fdACNo,charindex('-',fdAcNo,1)+1,20) ,substring(fdACNo,0,charindex('-',fdAcNo,0) ),(select top 1 fdacno from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end  from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno) from (select fdMno,fdAcNo as FDAcNo,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI from mmb_mas_FixedDeposit a where MOP like'%NEFT%' and fdStatus='L' and fdlicdt!=@lastdt   ) z group by fdmno,fdacno order by fdmno, fdacno
		end
		if (right(@lastdt,2)='29')
	begin
		declare cur cursor for select (select top 1 fdACName from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),fdmno,(select top 1 fdNo from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 convert(nvarchar(10),fdDt,105) from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 fdAmt from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 fdROI from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 convert(nvarchar(10),fdLICDt,105) from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),sum(fdi),substring(fdACNo,charindex('-',fdAcNo,1)+1,20) ,substring(fdACNo,0,charindex('-',fdAcNo,0) ),(select top 1 fdacno from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno),(select top 1 case when not datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105) when month(fdlicdt)=month(getdate()) then 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,0,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,0,fdLICDt)), dateadd(month,0,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,0,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,0,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' else 'from '+ convert(nvarchar(10),dateadd(day,1,fdlicdt),105)+' to '+ convert(varchar(10),cast(cast(year(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' +cast(month(dateadd(month,1,fdLICDt)) as nvarchar(20))+'-' + cast(datediff(day, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)),dateadd(month, 1, dateadd(day, 1-day(dateadd(month,1,fdLICDt)), dateadd(month,1,fdLICDt)))) as nvarchar(20)) as date),105)  +'-'+cast(case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,1-day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt))) as numeric(20,0)) else cast((datediff(day,dateadd(day,1-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,1-day(fdLICdt),fdLICdt)))-day(fdlicdt)) as numeric(20,0)) end as nvarchar(20))+' Days' end  from mmb_mas_FixedDeposit where fdmno=z.fdmno and fdAcno=z.fdAcno) from (select fdMno,fdAcNo as FDAcNo,case when datediff(day,dateadd(day,1-day(dateadd(month,0,fdLICdt)) ,dateadd(month,0,fdLICdt)),dateadd(month,1,dateadd(day,day(dateadd(month,0,fdLICdt)),dateadd(month,0,fdLICdt))))=day(fdlicdt) then cast(datediff(day,dateadd(day,day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,day(fdLICdt),fdLICdt)))*((fdAmt*(fdRoi/100))/365) as numeric(20,0)) when month(getdate())=month(fdlicdt) then cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,0,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  else cast((datediff(day,dateadd(day,2-day(fdLICdt) ,fdLICdt),dateadd(month,1,dateadd(day,2-day(dateadd(month,1,fdLICdt)),dateadd(month,1,fdLICdt))))-day(fdlicdt))*((fdAmt*(fdRoi/100))/365) as numeric(20,0))  end  as FDI from mmb_mas_FixedDeposit a where MOP like'%NEFT%' and fdStatus='L' and fdlicdt!=@lastdt   ) z group by fdmno,fdacno order by fdmno, fdacno
		end

	open cur
	--declare @fdacname nvarchar(20),@fdmno nvarchar(20),@fdno nvarchar(20),@date nvarchar(20),@Amount nvarchar(20),@roi nvarchar(20),@licdt nvarchar(20),@fdi nvarchar(20),@BankACNo nvarchar(20),@ifsc nvarchar(20),@fdAcNo nvarchar(20),@descr nvarchar(20)
	fetch next from cur into  @fdacname,@fdmno,@fdno,@date,@Amount,@roi,@licdt,@fdi,@BankACNo,@ifsc,@fdAcNo,@descr
	while(@@Fetch_status=0)
	begin
	set @row=@row+1
	print @row
	declare @dbTransRemarks nvarchar(max)
	select top 1 @dbTransRemarks =isnull( 'frmRec:'+ (select emp_no from Gen_mas_login where Login_id=@Loginid) +':' + cast(format((isnull(dbRtNo,0 )+ 1),'000000')as nvarchar(10))+':'+(select branch_id from mmb_branchdetails where Branch_Name=@BranchName ),'0')  from mmb_daybook
	declare @dbrtno nvarchar(max)
	select top 1 @dbrtno=IsNull(max(dbRtNo),0) from MMB_DayBook where dbEdpno=@fdmno and dbChqNo=@IFSC+'-'+@BankAcno and dbTrandt=cast(getdate() as date)--convert(varchar(10),getdate(),120)
	declare @ifscaii nvarchar(max)=null
	select top 1 @ifscaii= BranchName+'-'+BankName from IFSCAll where IFSCCode=@ifsc
	
	insert MMB_RTGS (RTGSDt,EDPNo,Name,ACNo,IFSC,RTGSAmt,RTGSBank,RTGSStatus,RTGSChqNo,Purpose,RefNo,BN,Remarks) values(convert(varchar(10),getdate(),120),@fdmno,@fdacname,@BankACNo,@ifsc,@fdi,@txtbank,'T','Online1','F.D Interest',@dbrtno,@ifscaii,@dbTransRemarks)
	
	fetch next from cur into  @fdacname,@fdmno,@fdno,@date,@Amount,@roi,@licdt,@fdi,@BankACNo,@ifsc,@fdAcNo,@descr
	end
	close cur
	deallocate cur
print 'daybook'
	
		update mmb_mas_FixedDeposit set fdLICDt=@lastdt where MOP like'%NEFT%' and fdStatus='L' and fdno in (select fdno from mmb_mas_FixedDeposit a where MOP like'%NEFT%' and fdStatus='L' and fdlicdt!=@lastdt)
		

	--print 'rtgs'
END

GO
/****** Object:  StoredProcedure [dbo].[PerLedgerHMLV]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
-- EXEC PerLedgerHMLV '41288','hml0111'
CREATE  PROCEDURE [dbo].[PerLedgerHMLV] @BMNo as nvarchar(7) ,@LnNo as Nvarchar(7) AS
Declare @LDt as SmallDateTime
Declare @ACHead as NVarChar(100)
Declare @ACheadI as NVarChar(100)
Declare @ACheadPI as NVarChar(100)
Declare @R as NVarchar(10)
Declare @P as Nvarchar(10)
Declare @OB as Nvarchar(10)
Declare @OBDt as SmallDateTime
Set @R='Receipt'
Set @P='P'
Set @OB='OB'
Set @OBDt='31/Mar/2010'
Select  @LDt=LDt from HML_LoanDetails where LNo=@LnNo and LMNo=@BMNo
Select @ACHead='House Mortgage Loan'
Set @ACHeadI=@ACHead +' Interest'
Set @ACHeadPI='Penal Interest'

IF (@LDt)>='2019-03-31'
	Begin
	Execute('Alter View AMLSql As Select * from MMB_DayBook  Where dbEDPNo='''+@BMNo+''' and  dbTranDt>='''+@LDt+''' and dbHead in ('''+@ACHead+''','''+@ACHeadI+''','''+@ACHeadPI+''') and dbparticular like ''%'+@LnNo+'%''  ')
	End
Else
	Begin
	Execute(' Alter View AMLSql As Select * from MMB_DayBook  Where dbEDPNo='''+@BMNo+''' and  dbTranDt>='''+@LDt+''' and dbHead in ('''+@ACHead+''','''+@ACHeadI+''','''+@ACHeadPI+''') and dbparticular like ''%'+@LnNo+'%''  Union Select * from DayBookOLD Where dbEDPNo='''+@BMNo+''' and dbTranDt>='''+@LDt+''' and dbHead in ('''+@ACHead+''','''+@ACHeadI+''','''+@ACHeadPI+''') and dbparticular like ''%'+@LnNo+'%'' ')
	End
Execute('Delete from PerLedgerML')
Execute('Insert INTO PerLedgerML( plTranDt,plMLB,plPayRec,plTranID,SNo) SELECT LDt,LAmt,'''+@P+''','''+@OB+''',0 from HML_LoanDetails where LBal>=0 and LMNo='''+@BMNo+''' and LType='''+@ACHead+''' and LNo='''+@LnNo+''' ')
if  @LDt<=@OBDt 
Begin
	Execute('Update PerLedgerML Set plMLB=(Select LBal from HML_LoanDetailsOLD where LNo='''+@LnNo+''' and  BMonth='''+@OBDt+''')')
end

IF (@LDt)>='2019-03-31'
	Begin
	Execute('Alter View AMLSql As Select * from MMB_DayBook  Where dbEDPNo='''+@BMNo+''' and  dbTranDt>'''+@LDt+''' and dbHead in ('''+@ACHead+''','''+@ACHeadI+''','''+@ACHeadPI+''') and dbparticular like ''%'+@LnNo+'%'' ')
	End
Else
	Begin
	Execute(' Alter View AMLSql As Select * from MMB_DayBook  Where dbEDPNo='''+@BMNo+''' and  dbTranDt>'''+@LDt+''' and dbHead in ('''+@ACHead+''','''+@ACHeadI+''','''+@ACHeadPI+''') and dbparticular like ''%'+@LnNo+'%''  Union Select * from DayBookOLD Where dbTranDt>'''+@LDt+''' and dbHead in ('''+@ACHead+''','''+@ACHeadI+''','''+@ACHeadPI+''') and dbparticular like ''%'+@LnNo+'%'' ')
	End
Execute('Insert INTO PerLedgerML( plTranDt,plMLI,plMPLI,plMLP,plTranID,plPayRec) SELECT dbTranDt, SUM(CASE WHEN dbHead = '''+@ACHeadI+''' AND dbPayRec ='''+@R+''' THEN dbAmt ELSE 0 END),SUM(CASE WHEN dbHead = '''+@ACHeadPI+''' AND dbPayRec ='''+@R+''' THEN dbAmt ELSE 0 END),SUM(CASE WHEN dbHead='''+@ACHead+''' AND dbPayRec = '''+@R+''' THEN dbAmt ELSE 0 END),Cast(dbRtNo as NVarchar(5))+Left(dbModeofPay,1),Left(dbPayRec,1) From AMLSql  GROUP BY dbEDPNo, dbTranDt,dbModeofPay,dbRtNo,dbPayRec  HAVING (dbPayRec='''+@R+''' and dbEDPNo='''+@BMNo +''')')
Execute('Delete PerLedgerML where plMLI=0 and plMLP=0 and plPayRec<>'''+@P+'''')
DECLARE @id INT 
SET @id = 0 
UPDATE PerLedgerML SET @id = SNo = @id + 1  where plTranID<>'OB'

Declare @SNo as Int
Declare @MLB as Int
--Declare @MLBSUB as Int
Declare @MLR as Int
Declare @TID as Nvarchar(50)
Declare @RP as NVarchar(10)
Declare @OBDate as SmallDateTime
Select @MLB=plMLB from PerLedgerMl where plTranID='OB'
--Declare PLTable Cursor  for Select plTranDt,plTranID,plPayRec,plMLP,SNo from  PerLedgerML  where plTranID<> '''+ @OB + '''    order by plTranDt, plTranID 
Declare PLTable Cursor  for Select plTranDt,plTranID,plPayRec,plMLP,SNo from  PerLedgerML  where plTranID<> '''+ @OB + '''    order by plTranDt, SNo 
Open PLTable
Fetch Next from PLTable into @OBDate,@TID,@RP,@MLR,@SNo
While @@Fetch_Status=0
Begin	
	Set @MLB=@MLB-@MLR
	--Set @MLBSUB=@MLB
	Execute ('Update PerLedgerML Set plMLB='+@MLB+' Where SNo='+@SNo)
	Fetch Next from PLTable into @OBDate,@TID,@RP,@MLR,@SNo
End
Set @OB='CB'
Set @R='R'
Execute('Insert INTO PerLedgerML( plTranDt,plMLB,plPayRec,plTranID,SNo) SELECT Current_TimeStamp,'''+@MLB+''','''+@R+''','''+@OB+''','+@id+' from HML_LoanDetails where LBal>0 and LMNo='''+@BMNo+''' and LType='''+@ACHead+''' and LNo='''+@LnNo+''' ')
Close PLTable
Deallocate PLTable
GO
/****** Object:  StoredProcedure [dbo].[PerLedgerMLV]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
-- EXEC PerLedgerMLV '42141','FDL0236'
CREATE PROCEDURE [dbo].[PerLedgerMLV] @BMNo as nvarchar(7) ,@LnNo as Nvarchar(7) AS
Declare @LDt as SmallDateTime
Declare @ACHead as NVarChar(100)
Declare @ACheadI as NVarChar(100)
Declare @R as NVarchar(10)
Declare @P as Nvarchar(10)
Declare @OB as Nvarchar(10)
Declare @OBDt as SmallDateTime
Set @R='Receipt'
Set @P='P'
Set @OB='OB'
Set @OBDt='31/Mar/2010'
Select  @LDt=LDt from MMB_mas_FDLoanDetails where LNo=@LnNo
Select @ACHead=LType from MMB_mas_FDLoanDetails Where LNo=@LnNo
Set @ACHeadI=@ACHead +' Interest'

IF (@LDt)>='2019-03-31'
	Begin
	Execute('Alter View AMLSql As Select * from MMB_DayBook  Where dbEDPNo='''+@BMNo+''' and  dbTranDt>='''+@LDt+''' and dbHead in ('''+@ACHead+''','''+@ACHeadI+''') and dbparticular like ''%'+@lnno+'%''')
	End
Else
	Begin
	Execute(' Alter View AMLSql As Select * from MMB_DayBook  Where dbEDPNo='''+@BMNo+''' and  dbTranDt>='''+@LDt+''' and dbHead in ('''+@ACHead+''','''+@ACHeadI+''') and dbparticular like ''%'+@lnno+'%'' Union Select * from DayBookOLD Where dbEDPNo='''+@BMNo+''' and dbTranDt>='''+@LDt+''' and dbHead in ('''+@ACHead+''','''+@ACHeadI+''') and dbparticular like ''%'+@lnno+'%''')
	End
Execute('Delete from PerLedgerML')
Execute('Insert INTO PerLedgerML( plTranDt,plMLB,plPayRec,plTranID,SNo) SELECT LDt,LAmt,'''+@P+''','''+@OB+''',0 from MMB_mas_FDLoanDetails where LNo='''+@LnNo+''' and LMNo='''+@BMNo+''' and LType='''+@ACHead+'''')
if  @LDt<=@OBDt 
Begin
	Execute('Update PerLedgerML Set plMLB=(Select LBal from MMB_mas_FDLoanDetailsOLD where LNo='''+@LnNo+''' and  BMonth='''+@OBDt+''')')
end

IF (@LDt)>='2019-03-31'
	Begin
	Execute('Alter View AMLSql As Select * from MMB_DayBook  Where dbEDPNo='''+@BMNo+''' and  dbTranDt>'''+@LDt+''' and dbHead in ('''+@ACHead+''','''+@ACHeadI+''') and dbparticular like ''%'+@lnno+'%''')
	End
Else
	Begin
	Execute(' Alter View AMLSql As Select * from MMB_DayBook  Where dbEDPNo='''+@BMNo+''' and  dbTranDt>'''+@LDt+''' and dbHead in ('''+@ACHead+''','''+@ACHeadI+''') and dbparticular like ''%'+@lnno+'%'' Union Select * from DayBookOLD Where dbTranDt>'''+@LDt+''' and dbHead in ('''+@ACHead+''','''+@ACHeadI+''') and dbparticular like ''%'+@lnno+'%''')
	End
Execute('Insert INTO PerLedgerML( plTranDt,plMLI,plMLP,plTranID,plPayRec) SELECT dbTranDt, SUM(CASE WHEN dbHead = '''+@ACHeadI+''' AND dbPayRec ='''+@R+''' THEN dbAmt ELSE 0 END),SUM(CASE WHEN dbHead='''+@ACHead+''' AND dbPayRec = '''+@R+''' THEN dbAmt ELSE 0 END),Cast(dbRtNo as NVarchar(5))+Left(dbModeofPay,1),Left(dbPayRec,1) From AMLSql  GROUP BY dbEDPNo, dbTranDt,dbModeofPay,dbRtNo,dbPayRec  HAVING (dbPayRec='''+@R+''' and dbEDPNo='''+@BMNo +''')')
Execute('Delete PerLedgerML where plMLI=0 and plMLP=0 and plPayRec<>'''+@P+'''')
DECLARE @id INT 
SET @id = 0 
UPDATE PerLedgerML SET @id = SNo = @id + 1  where plTranID<>'OB'

Declare @SNo as Int
Declare @MLB as Int
Declare @MLR as Int
Declare @TID as Nvarchar(50)
Declare @RP as NVarchar(10)
Declare @OBDate as SmallDateTime
Select @MLB=plMLB from PerLedgerMl where plTranID='OB'
--Declare PLTable Cursor  for Select plTranDt,plTranID,plPayRec,plMLP,SNo from  PerLedgerML  where plTranID<> '''+ @OB + '''    order by plTranDt, plTranID 
Declare PLTable Cursor  for Select plTranDt,plTranID,plPayRec,plMLP,SNo from  PerLedgerML  where plTranID<> '''+ @OB + '''    order by plTranDt, SNo 
Open PLTable
Fetch Next from PLTable into @OBDate,@TID,@RP,@MLR,@SNo
While @@Fetch_Status=0
Begin	
	Set @MLB=@MLB-@MLR
	Execute ('Update PerLedgerML Set plMLB='+@MLB+' Where SNo='+@SNo)
	Fetch Next from PLTable into @OBDate,@TID,@RP,@MLR,@SNo
End
Set @OB='CB'
Set @R='R'
Execute('Insert INTO PerLedgerML( plTranDt,plMLB,plPayRec,plTranID,SNo) SELECT Current_TimeStamp,LBal,'''+@R+''','''+@OB+''','+@id+' from MMB_mas_FDLoanDetails where LMNo='''+@BMNo+''' and LType='''+@ACHead+''' and LNo='''+@LnNo+'''')
Close PLTable
Deallocate PLTable
GO
/****** Object:  StoredProcedure [dbo].[perledgermlv1]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
-- EXEC PerLedgerMLV '42141','FDL0236'
CREATE PROCEDURE [dbo].[perledgermlv1] @BMNo as nvarchar(7) ,@LnNo as Nvarchar(7) AS
Declare @LDt as SmallDateTime
Declare @ACHead as NVarChar(100)
Declare @ACheadI as NVarChar(100)
Declare @R as NVarchar(10)
Declare @P as Nvarchar(10)
Declare @OB as Nvarchar(10)
Declare @OBDt as SmallDateTime
Set @R='Receipt'
Set @P='P'
Set @OB='OB'
Set @OBDt='31/Mar/2010'
Select  @LDt=LDt from MMB_mas_Mobile_LoanDetails where LNo=@LnNo
Select @ACHead=LType from MMB_mas_Mobile_LoanDetails Where LNo=@LnNo
Set @ACHeadI=@ACHead +'Interest'

IF (@LDt)>='2019-03-31'
	Begin
	Execute('Alter View AMLSql As Select * from MMB_DayBook  Where dbEDPNo='''+@BMNo+''' and  dbTranDt>='''+@LDt+''' and dbHead like ''%'+@ACHead+'%'' and dbparticular like ''%'+@lnno+'%''')
	End
Else
	Begin
	Execute(' Alter View AMLSql As Select * from MMB_DayBook  Where dbEDPNo='''+@BMNo+''' and  dbTranDt>='''+@LDt+''' and dbHead like ''%'+@ACHead+'%'' and dbparticular like ''%'+@lnno+'%'' Union Select * from DayBookOLD Where dbEDPNo='''+@BMNo+''' and dbTranDt>='''+@LDt+''' and dbHead like ''%'+@ACHead+'%'' and dbparticular like ''%'+@lnno+'%''')
	End
Execute('Delete from MLLEDGER')
Execute('Insert INTO MLLEDGER( plTranDt,plMLB,plPayRec,plTranID,SNo) SELECT LDt,LAmt,'''+@P+''','''+@OB+''',0 from MMB_mas_Mobile_LoanDetails where LBal>0 and LMNo='''+@BMNo+''' and LType like ''%'+@ACHead+'%''')


IF (@LDt)>='2019-03-31'
	Begin
	Execute('Alter View AMLSql As Select * from MMB_DayBook  Where dbEDPNo='''+@BMNo+''' and  dbTranDt>'''+@LDt+''' and dbHead like ''%'+@ACHead+'%'' and dbparticular like ''%'+@lnno+'%''')
	End
Else
	Begin
	Execute(' Alter View AMLSql As Select * from MMB_DayBook  Where dbEDPNo='''+@BMNo+''' and  dbTranDt>'''+@LDt+''' and dbHead like ''%'+@ACHead+'%'' and dbparticular like ''%'+@lnno+'%'' Union Select * from DayBookOLD Where dbTranDt>'''+@LDt+''' and dbHead like ''%'+@ACHead+'%'' and dbparticular like ''%'+@lnno+'%''')
	End
	

Execute('Insert INTO MLLEDGER( plTranDt,plMLI,plMLP,plTranID,plPayRec) SELECT dbTranDt, SUM(CASE WHEN dbHead like ''%'+@ACHead+'%'' AND dbPayRec ='''+@R+''' THEN dbAmt ELSE 0 END),SUM(CASE WHEN dbHead = '''+@ACHead+''' AND dbPayRec = '''+@R+''' THEN dbAmt ELSE 0 END),Cast(dbRtNo as NVarchar(5))+Left(dbModeofPay,1),Left(dbPayRec,1) From AMLSql  GROUP BY dbEDPNo, dbTranDt,dbModeofPay,dbRtNo,dbPayRec  HAVING (dbPayRec='''+@R+''' and dbEDPNo='''+@BMNo +''')')

Execute('update [TTCECSTEST].[dbo].[MLLEDGER] set plMLI = 0 where plMLI is  null')
Execute('update [TTCECSTEST].[dbo].[MLLEDGER] set [plMPLI] = 0 where [plMPLI] is  null')
Execute('update [TTCECSTEST].[dbo].[MLLEDGER] set [plMLP] = 0 where [plMLP] is  null')
Execute('update [TTCECSTEST].[dbo].[MLLEDGER] set [plMLB] = 0 where [plMLB] is  null')
Execute('Delete MLLEDGER where plMLI=0 and plMLP=0 and plPayRec<>'''+@P+'''')
DECLARE @id INT 
SET @id = 0 
UPDATE MLLEDGER SET  @id=SNo = @id + 1  where plTranID<>'OB'

Declare @SNo as Int
Declare @MLB as Int
Declare @MLR as Int
Declare @i as Int
Declare @TID as Nvarchar(50)
Declare @RP as NVarchar(10)
Declare @OBDate as SmallDateTime
Select @MLB=plMLB from MLLEDGER where plTranID='OB'
--Declare PLTable Cursor  for Select plTranDt,plTranID,plPayRec,plMLP,SNo from  PerLedgerML  where plTranID<> '''+ @OB + '''    order by plTranDt, plTranID 
Declare PLTable Cursor  for Select plTranDt,plTranID,plPayRec,plMLP,SNo from  MLLEDGER  where plTranID<> '''+ @OB + '''    order by plTranDt, SNo 
Open PLTable
Fetch Next from PLTable into @OBDate,@TID,@RP,@MLR,@SNo
While @@Fetch_Status=0
Begin	
	Set @MLB=@MLB-@MLR
	Execute ('Update MLLEDGER Set plMLB='''+@MLB+''' Where SNo='''+@SNo+'''')
	Fetch Next from PLTable into @OBDate,@TID,@RP,@MLR,@SNo
End
Set @OB='CB'
Set @R='R'
Set @i='0'
Execute('Insert INTO MLLEDGER( plTranDt,[plMLI],[plMPLI],[plMLP],plMLB,plPayRec,plTranID,SNo) SELECT Current_TimeStamp,'''+@i+''','''+@i+''','''+@i+''',LBal,'''+@R+''','''+@OB+''','+@id+' from MMB_mas_Mobile_LoanDetails where LBal>0 and LMNo='''+@BMNo+''' and LType like''%'+@ACHead+'%''')
Close PLTable
Deallocate PLTable
GO
/****** Object:  UserDefinedFunction [dbo].[NumbersToWords]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[NumbersToWords] (@Number BIGINT)  
RETURNS NVARCHAR(MAX)  
AS  
BEGIN  
    DECLARE @Words NVARCHAR(MAX) = ''
  
    IF @Number = 0 RETURN 'Zero'
    
    -- Crore
    IF ((@Number/10000000) > 0)  
        SET @Words = @Words + dbo.NumberToWords(@Number / 10000000) + ' Crore '  
        SET @Number = @Number % 10000000  

    -- Lakh
    IF ((@Number/100000) >0)   
        SET @Words = @Words + dbo.NumberToWords(@Number / 100000) + ' Lakh '  
        SET @Number = @Number % 100000  

    -- Thousand
    IF ((@Number/1000 )>0)  
        SET @Words = @Words + dbo.NumberToWords(@Number / 1000) + ' Thousand '  
        SET @Number = @Number % 1000  

    -- Hundred
    IF ((@Number/100 )>0) 
        SET @Words = @Words + dbo.NumberToWords(@Number / 100) + ' Hundred '  
        SET @Number = @Number % 100  

    -- Tens and Units
    DECLARE @OnesAndTens TABLE (Number INT, Word NVARCHAR(50))
    INSERT INTO @OnesAndTens VALUES  
        (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'),  
        (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine'), (10, 'Ten'),  
        (11, 'Eleven'), (12, 'Twelve'), (13, 'Thirteen'), (14, 'Fourteen'), (15, 'Fifteen'),  
        (16, 'Sixteen'), (17, 'Seventeen'), (18, 'Eighteen'), (19, 'Nineteen'),  
        (20, 'Twenty'), (30, 'Thirty'), (40, 'Forty'), (50, 'Fifty'),  
        (60, 'Sixty'), (70, 'Seventy'), (80, 'Eighty'), (90, 'Ninety')

    IF @Number > 0  
    BEGIN  
        DECLARE @Word NVARCHAR(50)
        SELECT @Word = Word FROM @OnesAndTens WHERE Number = @Number
        IF @Word IS NOT NULL  
            SET @Words = @Words + @Word  
        ELSE  
        BEGIN  
            SELECT @Words = @Words + Word + ' ' FROM @OnesAndTens WHERE Number = (@Number / 10) * 10  
            SELECT @Words = @Words + Word FROM @OnesAndTens WHERE Number = @Number % 10  
        END  
    END  
  
    RETURN LTRIM(RTRIM(@Words))  
END  
GO
/****** Object:  UserDefinedFunction [dbo].[NumberToWords]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[NumberToWords](@Number INT)
RETURNS VARCHAR(MAX)
AS
BEGIN
    DECLARE @Words VARCHAR(MAX)

    IF @Number = 1 SET @Words = 'One'
    ELSE IF @Number = 2 SET @Words = 'Two'
    ELSE IF @Number = 3 SET @Words = 'Three'
    ELSE IF @Number = 4 SET @Words = 'Four'
    -- Add more cases as needed

    RETURN @Words
END
GO
/****** Object:  Table [dbo].[BankDetails]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[BankDetails](
	[Bank_Name] [varchar](100) NULL,
	[IFSC_CODE] [varchar](50) NULL,
	[MICR_CODE] [varchar](100) NULL,
	[BRANCH_NAME] [varchar](350) NULL,
	[DISTRICT] [varchar](50) NULL,
	[STATE] [varchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bdysms]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bdysms](
	[mno] [nvarchar](50) NULL,
	[name] [varchar](50) NULL,
	[dob] [datetime] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bondprint]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bondprint](
	[fdno] [int] NULL,
	[tkn] [char](1) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CHQMNO]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CHQMNO](
	[SNOC] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[daybook20082022]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[daybook20082022](
	[dbTranDt] [smalldatetime] NULL,
	[dbEDPNo] [nvarchar](255) NULL,
	[dbParticular] [nvarchar](255) NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](10) NULL,
	[dbChqNo] [nvarchar](255) NULL,
	[dbPayRec] [nvarchar](7) NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](50) NULL,
	[dbRVNo] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[daybookdummy]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[daybookdummy](
	[dbTranDt] [smalldatetime] NOT NULL,
	[dbEDPNo] [nvarchar](20) NOT NULL,
	[dbParticular] [nvarchar](300) NOT NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](10) NOT NULL,
	[dbChqNo] [nvarchar](500) NOT NULL,
	[dbPayRec] [nvarchar](7) NOT NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](75) NOT NULL,
	[dbRtNo] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DayBookOLD]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DayBookOLD](
	[dbTranDt] [smalldatetime] NULL,
	[dbEDPNo] [nvarchar](255) NULL,
	[dbParticular] [nvarchar](255) NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](50) NULL,
	[dbChqNo] [nvarchar](255) NULL,
	[dbPayRec] [nvarchar](50) NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](50) NULL,
	[dbRVNo] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[dum]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dum](
	[dbTranDt] [smalldatetime] NOT NULL,
	[dbEDPNo] [nvarchar](20) NOT NULL,
	[dbParticular] [nvarchar](300) NOT NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](10) NOT NULL,
	[dbChqNo] [nvarchar](500) NOT NULL,
	[dbPayRec] [nvarchar](7) NOT NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](75) NOT NULL,
	[dbRtNo] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[dummonthday]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dummonthday](
	[dbTranDt] [smalldatetime] NOT NULL,
	[dbEDPNo] [nvarchar](20) NOT NULL,
	[dbParticular] [nvarchar](300) NOT NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](10) NOT NULL,
	[dbChqNo] [nvarchar](500) NOT NULL,
	[dbPayRec] [nvarchar](7) NOT NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](75) NOT NULL,
	[dbRtNo] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Dummybanknames]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dummybanknames](
	[SrNo] [int] NOT NULL,
	[BankName] [nvarchar](100) NULL,
	[CBalance] [float] NULL,
	[Sign1] [nvarchar](50) NULL,
	[Sign2] [nvarchar](50) NULL,
	[Sign3] [nvarchar](50) NULL,
	[Ser_Charge] [float] NULL,
	[BB] [nvarchar](50) NULL,
	[PLeft] [int] NULL,
	[PTop] [int] NULL,
	[CLimit] [int] NULL,
	[F1T] [int] NULL,
	[F1L] [int] NULL,
	[F2T] [int] NULL,
	[F2L] [int] NULL,
	[F3T] [int] NULL,
	[F3L] [int] NULL,
	[F4T] [int] NULL,
	[F4L] [int] NULL,
	[F5T] [int] NULL,
	[F5L] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[dummyDaybook]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dummyDaybook](
	[dbTranDt] [smalldatetime] NOT NULL,
	[dbEDPNo] [nvarchar](20) NOT NULL,
	[dbParticular] [nvarchar](300) NOT NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](10) NOT NULL,
	[dbChqNo] [nvarchar](500) NOT NULL,
	[dbPayRec] [nvarchar](7) NOT NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](75) NOT NULL,
	[dbRtNo] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DUMMYFD]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DUMMYFD](
	[fdMNo] [nvarchar](7) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[FD_Pre_Closure]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FD_Pre_Closure](
	[Date] [datetime] NULL,
	[fdno] [int] NULL,
	[label1] [nvarchar](350) NULL,
	[label2] [nvarchar](350) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[fdbacknov]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[fdbacknov](
	[fdNo] [int] IDENTITY(1,1) NOT NULL,
	[fdMNo] [nvarchar](7) NULL,
	[fdName] [nvarchar](255) NULL,
	[fdNominee] [nvarchar](255) NULL,
	[fdAddress] [nvarchar](255) NULL,
	[fdMobile] [float] NULL,
	[fdDt] [datetime] NULL,
	[fdAmt] [int] NULL,
	[fdROI] [float] NULL,
	[fdDays] [int] NULL,
	[dbRtNo] [int] NULL,
	[dbTransID] [nvarchar](100) NULL,
	[fdStatus] [nvarchar](1) NULL,
	[fdLICDt] [smalldatetime] NULL,
	[fdACNo] [nvarchar](255) NULL,
	[fdACName] [nvarchar](255) NULL,
	[fdRemarks] [nvarchar](255) NULL,
	[MOP] [nvarchar](100) NULL,
	[FDCal] [nvarchar](1) NULL,
	[FDmethod] [nvarchar](100) NULL,
	[FDCategory] [nvarchar](100) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[fixeddummy]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[fixeddummy](
	[fdNo] [int] IDENTITY(1,1) NOT NULL,
	[fdMNo] [nvarchar](7) NULL,
	[fdName] [nvarchar](255) NULL,
	[fdNominee] [nvarchar](255) NULL,
	[fdAddress] [nvarchar](255) NULL,
	[fdMobile] [float] NULL,
	[fdDt] [datetime] NULL,
	[fdAmt] [int] NULL,
	[fdROI] [float] NULL,
	[fdDays] [int] NULL,
	[dbRtNo] [int] NULL,
	[dbTransID] [nvarchar](100) NULL,
	[fdStatus] [nvarchar](1) NULL,
	[fdLICDt] [smalldatetime] NULL,
	[fdACNo] [nvarchar](255) NULL,
	[fdACName] [nvarchar](255) NULL,
	[fdRemarks] [nvarchar](255) NULL,
	[MOP] [nvarchar](100) NULL,
	[FDCal] [nvarchar](1) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[fx1]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[fx1](
	[dbtrandt] [smalldatetime] NOT NULL,
	[dbedpno] [nvarchar](20) NOT NULL,
	[dbparticular] [nvarchar](300) NOT NULL,
	[dbamt] [float] NULL,
	[dbmodeofpay] [nvarchar](10) NOT NULL,
	[dbchqno] [nvarchar](500) NULL,
	[dbhead] [nvarchar](75) NULL,
	[dbrtno] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Gen_mas_AccountingYear]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gen_mas_AccountingYear](
	[From_dt] [date] NULL,
	[To_dt] [date] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Gen_mas_authorization]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Gen_mas_authorization](
	[Comp_code] [varchar](4) NOT NULL,
	[Login_id] [nvarchar](25) NOT NULL,
	[Module_code] [char](3) NOT NULL,
	[Form_rep_Sl] [int] NOT NULL,
	[Permission] [nvarchar](4) NOT NULL,
	[Valid_from] [datetime] NOT NULL,
	[valid_to] [datetime] NOT NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Gen_mas_company]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Gen_mas_company](
	[Corp_code] [char](2) NOT NULL,
	[Comp_code] [varchar](4) NOT NULL,
	[Comp_full_name] [nvarchar](100) NOT NULL,
	[Comp_short_name] [nvarchar](10) NOT NULL,
	[Add1] [nvarchar](50) NOT NULL,
	[Add2] [nvarchar](50) NULL,
	[Add3] [nvarchar](50) NULL,
	[Add4] [nvarchar](50) NULL,
	[City] [nvarchar](15) NOT NULL,
	[State] [nvarchar](15) NOT NULL,
	[PB_no] [nvarchar](5) NULL,
	[PIN_ZIP] [numeric](6, 0) NOT NULL,
	[Phone_no] [nvarchar](10) NULL,
	[FAX] [nvarchar](10) NULL,
	[Incoming_Email] [nvarchar](50) NULL,
	[Outgoing_Email] [nvarchar](50) NULL,
	[Email_password] [nvarchar](25) NULL,
	[SMTP_Port] [numeric](6, 0) NULL,
	[SMTP_Host] [nvarchar](25) NULL,
	[Website] [nvarchar](50) NULL,
	[Valid_from] [datetime] NOT NULL,
	[Valid_to] [datetime] NOT NULL,
	[Corp_logo_file] [nvarchar](50) NULL,
	[CE_Reg_no] [nvarchar](15) NULL,
	[ECC_No] [nvarchar](15) NULL,
	[Cent_Ex_Range] [nvarchar](100) NULL,
	[Cent_Ex_Division] [nvarchar](25) NULL,
	[Ex_Commissionerate] [nvarchar](100) NULL,
	[TIN_No] [nvarchar](12) NULL,
	[CST_No] [nvarchar](25) NULL,
	[PAN_No] [nvarchar](10) NULL,
	[Road_Permit_No] [nvarchar](15) NULL,
	[Form25B_Regnno] [nvarchar](15) NULL,
	[EstablishmentID_PF] [nvarchar](20) NULL,
	[FontFamily] [nvarchar](50) NULL,
	[Fontcolor] [nvarchar](15) NULL,
	[Client_code] [varchar](5) NULL,
	[CEO_Emp_no] [char](5) NULL,
	[Area_code] [char](3) NULL,
	[Device_id] [int] NULL,
	[Shiftnote_avail] [char](1) NULL,
	[Cent_Ex_Designation] [varchar](50) NULL,
	[Cent_Ex_Address] [varchar](100) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Gen_mas_corporate]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Gen_mas_corporate](
	[Corp_code] [char](2) NOT NULL,
	[Corp_name] [nvarchar](100) NOT NULL,
	[Add1] [nvarchar](50) NOT NULL,
	[Add2] [nvarchar](50) NULL,
	[Add3] [nvarchar](50) NULL,
	[Add4] [nvarchar](50) NULL,
	[City] [nvarchar](15) NULL,
	[State] [nvarchar](15) NULL,
	[PB_no] [nvarchar](5) NULL,
	[PIN_ZIP] [numeric](6, 0) NULL,
	[Phone_no] [nvarchar](10) NULL,
	[FAX] [nvarchar](10) NULL,
	[Email] [nvarchar](50) NULL,
	[Email_password] [nvarchar](25) NULL,
	[SMTP_Port] [nvarchar](15) NULL,
	[SMTP_Host] [nvarchar](15) NULL,
	[Website] [nvarchar](50) NULL,
	[Valid_from] [datetime] NOT NULL,
	[Valid_to] [datetime] NOT NULL,
	[Corp_logo_file] [nvarchar](25) NULL,
	[Password] [nvarchar](11) NULL,
	[Last_login] [datetime] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Gen_mas_formrep]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Gen_mas_formrep](
	[Module_code] [char](3) NULL,
	[Form_rep_name] [nvarchar](50) NOT NULL,
	[Form_rep_sl] [int] NOT NULL,
	[Form_rep_mdesc] [nvarchar](50) NOT NULL,
	[Form_rep_ldesc] [nvarchar](50) NULL,
	[Form_rep_parsl] [int] NOT NULL,
	[Form_rep_lvl] [char](1) NOT NULL,
	[Table_name1] [nvarchar](50) NULL,
	[Table_name1_UFN] [nvarchar](50) NULL,
	[Table_name2] [nvarchar](50) NULL,
	[Table_name2_UFN] [nvarchar](50) NULL,
	[Table_name3] [nvarchar](50) NULL,
	[Table_name3_UFN] [nvarchar](50) NULL,
	[Table_name4] [nvarchar](50) NULL,
	[Table_name4_UFN] [nvarchar](50) NULL,
	[Table_name5] [nvarchar](50) NULL,
	[Table_name5_UFN] [nvarchar](50) NULL,
 CONSTRAINT [PK_Gen_mas_formrep] PRIMARY KEY CLUSTERED 
(
	[Form_rep_sl] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Gen_mas_log]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Gen_mas_log](
	[Login_ID] [nvarchar](10) NOT NULL,
	[Host_name] [nvarchar](50) NOT NULL,
	[Date_time] [datetime] NOT NULL,
	[Form_rep_sl] [int] NOT NULL,
	[Table_name] [nvarchar](50) NOT NULL,
	[Table_key] [nvarchar](4000) NULL,
	[Manipulation] [varchar](1) NOT NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Gen_mas_login]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Gen_mas_login](
	[Comp_code] [varchar](4) NOT NULL,
	[Emp_no] [nvarchar](5) NOT NULL,
	[Login_id] [nvarchar](25) NOT NULL,
	[Password] [nvarchar](20) NOT NULL,
	[Valid_from] [date] NOT NULL,
	[Valid_to] [date] NOT NULL,
	[Last_login] [datetime] NULL,
	[Expand_all_while_loading] [char](1) NULL,
	[Branch_ID] [nvarchar](2) NULL,
	[Mobile_No] [nvarchar](10) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Gen_mas_login1]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Gen_mas_login1](
	[Comp_code] [varchar](4) NOT NULL,
	[Emp_no] [nvarchar](5) NOT NULL,
	[Login_id] [nvarchar](10) NOT NULL,
	[Password] [nvarchar](20) NOT NULL,
	[Valid_from] [date] NOT NULL,
	[Valid_to] [date] NOT NULL,
	[Last_login] [datetime] NULL,
	[Expand_all_while_loading] [char](1) NULL,
	[Branch_ID] [nvarchar](2) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Gen_mas_module]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Gen_mas_module](
	[Module_code] [char](3) NOT NULL,
	[Module_name] [nvarchar](15) NOT NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[HML_LoanDetails]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[HML_LoanDetails](
	[LMNo] [nvarchar](8) NULL,
	[LEDPNo] [char](7) NULL,
	[LType] [varchar](50) NOT NULL,
	[LNo] [nvarchar](7) NULL,
	[LDt] [smalldatetime] NULL,
	[LAmt] [int] NULL,
	[LBal] [int] NULL,
	[LDem] [int] NULL,
	[LIOd] [int] NULL,
	[LROI] [float] NULL,
	[LICDt] [smalldatetime] NULL,
	[LDM] [smalldatetime] NULL,
	[NOI] [int] NULL,
	[lstatus] [nchar](1) NULL,
	[pod] [int] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[IFSCAll]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IFSCAll](
	[BankName] [nvarchar](100) NULL,
	[IFSCCode] [nvarchar](11) NULL,
	[MICR] [float] NULL,
	[BranchName] [nvarchar](100) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[inactive]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inactive](
	[SMNO] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ipc]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ipc](
	[fdt] [smalldatetime] NOT NULL,
	[fdNo] [nvarchar](300) NOT NULL,
	[fdROI] [int] NOT NULL,
	[fdamt] [float] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[LoanDetails]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[LoanDetails](
	[LMNo] [nvarchar](8) NULL,
	[LEDPNo] [char](7) NULL,
	[LType] [varchar](50) NOT NULL,
	[LNo] [nvarchar](7) NULL,
	[LDt] [smalldatetime] NULL,
	[LAmt] [int] NULL,
	[LBal] [int] NULL,
	[LDem] [int] NULL,
	[LIOd] [int] NULL,
	[LROI] [float] NULL,
	[LICDt] [smalldatetime] NULL,
	[LDM] [smalldatetime] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Login_otp]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Login_otp](
	[DDate] [smalldatetime] NULL,
	[UserID] [nvarchar](50) NULL,
	[OTP] [varchar](10) NULL,
	[Vaild] [varchar](10) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MEMBERBDETAILSDUMMY]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MEMBERBDETAILSDUMMY](
	[MNo] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Gender] [varchar](1) NULL,
	[DOB] [smalldatetime] NOT NULL,
	[Mobile_No] [varchar](12) NULL,
	[Address] [varchar](255) NULL,
	[Remarks] [varchar](50) NULL,
	[DOA] [smalldatetime] NULL,
	[SR_Name] [nvarchar](5) NULL,
	[Pan_No] [nvarchar](50) NULL,
	[Aadhar_No] [nvarchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MLLEDGER]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MLLEDGER](
	[plTranDt] [smalldatetime] NULL,
	[plMLI] [float] NULL,
	[plMPLI] [float] NULL,
	[plMLP] [float] NULL,
	[plMLB] [float] NULL,
	[plPayRec] [nvarchar](1) NULL,
	[plTranID] [varchar](10) NULL,
	[SNo] [int] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MMB_BranchDetails]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MMB_BranchDetails](
	[Branch_ID] [varchar](2) NULL,
	[Branch_Name] [varchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MMB_DayBook]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MMB_DayBook](
	[dbTranDt] [smalldatetime] NOT NULL,
	[dbEDPNo] [nvarchar](20) NOT NULL,
	[dbParticular] [nvarchar](300) NOT NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](10) NOT NULL,
	[dbChqNo] [nvarchar](500) NOT NULL,
	[dbPayRec] [nvarchar](7) NOT NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](75) NOT NULL,
	[dbRtNo] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MMB_DayBookbck]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MMB_DayBookbck](
	[dbTranDt] [smalldatetime] NOT NULL,
	[dbEDPNo] [nvarchar](20) NOT NULL,
	[dbParticular] [nvarchar](300) NOT NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](10) NOT NULL,
	[dbChqNo] [nvarchar](500) NOT NULL,
	[dbPayRec] [nvarchar](7) NOT NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](75) NOT NULL,
	[dbRtNo] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MMB_DayBookshare]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MMB_DayBookshare](
	[dbTranDt] [smalldatetime] NOT NULL,
	[dbEDPNo] [nvarchar](20) NOT NULL,
	[dbParticular] [nvarchar](300) NOT NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](10) NOT NULL,
	[dbChqNo] [nvarchar](500) NOT NULL,
	[dbPayRec] [nvarchar](7) NOT NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](75) NOT NULL,
	[dbRtNo] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MMB_DBHEAD]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MMB_DBHEAD](
	[DBSno] [nchar](10) NULL,
	[DbHead] [nvarchar](500) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MMB_Establishment]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MMB_Establishment](
	[SNo] [varchar](5) NULL,
	[EstType] [nvarchar](500) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MMB_FD_ClosedDeposit]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MMB_FD_ClosedDeposit](
	[FDNo] [int] NULL,
	[FCDays] [int] NULL,
	[FCROI] [float] NULL,
	[FDAmt] [int] NULL,
	[FCInt] [int] NULL,
	[PaidPeriod] [nvarchar](255) NULL,
	[FDIPaid] [int] NULL,
	[FCC] [int] NULL,
	[ChqAmt] [int] NULL,
	[Bank] [nvarchar](255) NULL,
	[VNo] [int] NULL,
	[Remarks] [nvarchar](100) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MMB_mas_BankNames]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MMB_mas_BankNames](
	[SrNo] [int] NOT NULL,
	[BankName] [nvarchar](100) NULL,
	[CBalance] [float] NULL,
	[Sign1] [nvarchar](50) NULL,
	[Sign2] [nvarchar](50) NULL,
	[Sign3] [nvarchar](50) NULL,
	[Ser_Charge] [float] NULL,
	[BB] [nvarchar](50) NULL,
	[PLeft] [int] NULL,
	[PTop] [int] NULL,
	[CLimit] [int] NULL,
	[F1T] [int] NULL,
	[F1L] [int] NULL,
	[F2T] [int] NULL,
	[F2L] [int] NULL,
	[F3T] [int] NULL,
	[F3L] [int] NULL,
	[F4T] [int] NULL,
	[F4L] [int] NULL,
	[F5T] [int] NULL,
	[F5L] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MMB_mas_FDLoanDetails]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MMB_mas_FDLoanDetails](
	[LMNo] [nvarchar](8) NOT NULL,
	[LType] [varchar](50) NULL,
	[FDNO] [nvarchar](50) NOT NULL,
	[LNo] [nvarchar](7) NOT NULL,
	[LDt] [smalldatetime] NULL,
	[LAmt] [int] NULL,
	[LBal] [int] NULL,
	[LIOd] [int] NULL,
	[LROI] [float] NULL,
	[LICDt] [smalldatetime] NULL,
	[LDM] [smalldatetime] NULL,
	[LStatus] [varchar](1) NULL,
 CONSTRAINT [PK_MMB_mas_FDLoanDetails] PRIMARY KEY CLUSTERED 
(
	[LMNo] ASC,
	[FDNO] ASC,
	[LNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MMB_mas_FDLoanLedger]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MMB_mas_FDLoanLedger](
	[MNO] [nvarchar](50) NULL,
	[LNO] [nvarchar](50) NULL,
	[RTNO] [nvarchar](50) NULL,
	[Date] [smalldatetime] NULL,
	[PRI] [int] NULL,
	[INT] [int] NULL,
	[BAL] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[mmb_mas_FixedDeposit]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mmb_mas_FixedDeposit](
	[fdNo] [int] IDENTITY(1,1) NOT NULL,
	[fdMNo] [nvarchar](7) NULL,
	[fdName] [nvarchar](255) NULL,
	[fdNominee] [nvarchar](255) NULL,
	[fdAddress] [nvarchar](255) NULL,
	[fdMobile] [float] NULL,
	[fdDt] [datetime] NULL,
	[fdAmt] [int] NULL CONSTRAINT [DF_mmb_mas_FixedDeposit_fdAmt]  DEFAULT ((0)),
	[fdROI] [float] NULL CONSTRAINT [DF_mmb_mas_FixedDeposit_fdROI]  DEFAULT ((0)),
	[fdDays] [int] NULL CONSTRAINT [DF_mmb_mas_FixedDeposit_fdDays]  DEFAULT ((0)),
	[dbRtNo] [int] NULL CONSTRAINT [DF_mmb_mas_FixedDeposit_dbRVNo]  DEFAULT ((0)),
	[dbTransID] [nvarchar](100) NULL,
	[fdStatus] [nvarchar](1) NULL,
	[fdLICDt] [smalldatetime] NULL,
	[fdACNo] [nvarchar](255) NULL,
	[fdACName] [nvarchar](255) NULL,
	[fdRemarks] [nvarchar](255) NULL,
	[MOP] [nvarchar](100) NULL,
	[FDCal] [nvarchar](1) NULL,
	[FDmethod] [nvarchar](100) NULL,
	[FDCategory] [nvarchar](100) NULL,
	[FdNomineeaadhar] [nvarchar](100) NULL,
 CONSTRAINT [PK_mmb_mas_FixedDeposit] PRIMARY KEY CLUSTERED 
(
	[fdNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[mmb_mas_FixedDeposit_old]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[mmb_mas_FixedDeposit_old](
	[fdNo] [int] NOT NULL,
	[fdMNo] [nvarchar](7) NOT NULL,
	[fdName] [nvarchar](255) NULL,
	[fdNominee] [nvarchar](255) NULL,
	[fdAddress] [nvarchar](255) NULL,
	[fdMobile] [varchar](12) NULL,
	[fdDt] [date] NULL,
	[fdAmt] [int] NULL CONSTRAINT [DF_FixedDeposit_fdAmt]  DEFAULT ((0)),
	[fdROI] [float] NULL CONSTRAINT [DF_FixedDeposit_fdROI]  DEFAULT ((0)),
	[fdDays] [int] NULL CONSTRAINT [DF_FixedDeposit_fdDays]  DEFAULT ((0)),
	[dbRTNo] [nvarchar](50) NULL CONSTRAINT [DF_FixedDeposit_dbRVNo]  DEFAULT ((0)),
	[dbTransID] [nvarchar](255) NULL,
	[fdStatus] [nvarchar](1) NULL,
	[fdLICDt] [date] NULL,
	[fdACNo] [nvarchar](255) NULL,
	[fdACName] [nvarchar](255) NULL,
	[fdRemarks] [nvarchar](50) NULL,
	[MOP] [nvarchar](100) NULL,
	[FDCal] [nvarchar](1) NULL,
 CONSTRAINT [PK_mmb_mas_FixedDeposit_1] PRIMARY KEY CLUSTERED 
(
	[fdNo] ASC,
	[fdMNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[mmb_mas_FixedDeposit20250331]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mmb_mas_FixedDeposit20250331](
	[fdNo] [int] IDENTITY(1,1) NOT NULL,
	[fdMNo] [nvarchar](7) NULL,
	[fdName] [nvarchar](255) NULL,
	[fdNominee] [nvarchar](255) NULL,
	[fdAddress] [nvarchar](255) NULL,
	[fdMobile] [float] NULL,
	[fdDt] [datetime] NULL,
	[fdAmt] [int] NULL,
	[fdROI] [float] NULL,
	[fdDays] [int] NULL,
	[dbRtNo] [int] NULL,
	[dbTransID] [nvarchar](100) NULL,
	[fdStatus] [nvarchar](1) NULL,
	[fdLICDt] [smalldatetime] NULL,
	[fdACNo] [nvarchar](255) NULL,
	[fdACName] [nvarchar](255) NULL,
	[fdRemarks] [nvarchar](255) NULL,
	[MOP] [nvarchar](100) NULL,
	[FDCal] [nvarchar](1) NULL,
	[FDmethod] [nvarchar](100) NULL,
	[FDCategory] [nvarchar](100) NULL,
	[FdNomineeaadhar] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[mmb_mas_FixedDeposit30012023]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mmb_mas_FixedDeposit30012023](
	[fdNoch] [int] NOT NULL,
	[fdMNo] [nvarchar](7) NULL,
	[fdName] [nvarchar](255) NULL,
	[fdNominee] [nvarchar](255) NULL,
	[fdAddress] [nvarchar](255) NULL,
	[fdMobile] [float] NULL,
	[fdDt] [datetime] NULL,
	[fdAmt] [int] NULL,
	[fdROI] [float] NULL,
	[fdDays] [int] NULL,
	[dbRtNo] [int] NULL,
	[dbTransID] [nvarchar](100) NULL,
	[fdStatus] [nvarchar](1) NULL,
	[fdLICDt] [smalldatetime] NULL,
	[fdACNo] [nvarchar](255) NULL,
	[fdACName] [nvarchar](255) NULL,
	[fdRemarks] [nvarchar](255) NULL,
	[MOP] [nvarchar](100) NULL,
	[FDCal] [nvarchar](1) NULL,
	[FDmethod] [nvarchar](100) NULL,
	[FDCategory] [nvarchar](100) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[mmb_mas_FixedDeposit36730012024]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mmb_mas_FixedDeposit36730012024](
	[fdNo] [int] IDENTITY(1,1) NOT NULL,
	[fdMNo] [nvarchar](7) NULL,
	[fdName] [nvarchar](255) NULL,
	[fdNominee] [nvarchar](255) NULL,
	[fdAddress] [nvarchar](255) NULL,
	[fdMobile] [float] NULL,
	[fdDt] [datetime] NULL,
	[fdAmt] [int] NULL,
	[fdROI] [float] NULL,
	[fdDays] [int] NULL,
	[dbRtNo] [int] NULL,
	[dbTransID] [nvarchar](100) NULL,
	[fdStatus] [nvarchar](1) NULL,
	[fdLICDt] [smalldatetime] NULL,
	[fdACNo] [nvarchar](255) NULL,
	[fdACName] [nvarchar](255) NULL,
	[fdRemarks] [nvarchar](255) NULL,
	[MOP] [nvarchar](100) NULL,
	[FDCal] [nvarchar](1) NULL,
	[FDmethod] [nvarchar](100) NULL,
	[FDCategory] [nvarchar](100) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[mmb_mas_FixedDepositbck]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mmb_mas_FixedDepositbck](
	[fdNo] [int] IDENTITY(1,1) NOT NULL,
	[fdMNo] [nvarchar](7) NULL,
	[fdName] [nvarchar](255) NULL,
	[fdNominee] [nvarchar](255) NULL,
	[fdAddress] [nvarchar](255) NULL,
	[fdMobile] [float] NULL,
	[fdDt] [datetime] NULL,
	[fdAmt] [int] NULL,
	[fdROI] [float] NULL,
	[fdDays] [int] NULL,
	[dbRtNo] [int] NULL,
	[dbTransID] [nvarchar](100) NULL,
	[fdStatus] [nvarchar](1) NULL,
	[fdLICDt] [smalldatetime] NULL,
	[fdACNo] [nvarchar](255) NULL,
	[fdACName] [nvarchar](255) NULL,
	[fdRemarks] [nvarchar](255) NULL,
	[MOP] [nvarchar](100) NULL,
	[FDCal] [nvarchar](1) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MMB_mas_HMLLedger]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MMB_mas_HMLLedger](
	[MNO] [nvarchar](50) NULL,
	[LNO] [nvarchar](50) NULL,
	[RTNO] [nvarchar](50) NULL,
	[Date] [smalldatetime] NULL,
	[PRI] [int] NULL,
	[INT] [int] NULL,
	[BAL] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MMB_mas_Members]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MMB_mas_Members](
	[MNo] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Gender] [varchar](1) NULL,
	[DOB] [smalldatetime] NOT NULL,
	[Mobile_No] [varchar](12) NULL,
	[Alt_Mobile_No] [varchar](12) NULL,
	[Address] [varchar](255) NULL,
	[Remarks] [varchar](50) NULL,
	[DOA] [smalldatetime] NULL,
	[SR_Name] [nvarchar](5) NULL,
	[Pan_No] [nvarchar](50) NULL,
	[Aadhar_No] [nvarchar](50) NULL,
	[MMail] [nvarchar](50) NULL,
 CONSTRAINT [PK_MMB_mas_Members] PRIMARY KEY CLUSTERED 
(
	[MNo] ASC,
	[DOB] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MMB_mas_Mobile_LoanDetails]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MMB_mas_Mobile_LoanDetails](
	[LMNo] [nvarchar](8) NOT NULL,
	[LType] [varchar](50) NULL,
	[FDNO] [nvarchar](50) NOT NULL,
	[LNo] [nvarchar](7) NOT NULL,
	[LDt] [smalldatetime] NULL,
	[LAmt] [int] NULL,
	[LBal] [int] NULL,
	[LIOd] [int] NULL,
	[LNOI] [int] NULL,
	[LROI] [float] NULL,
	[LICDt] [smalldatetime] NULL,
	[LDM] [smalldatetime] NULL,
	[LStatus] [varchar](1) NULL,
 CONSTRAINT [PK_MMB_mas_Mobile_LoanDetails] PRIMARY KEY CLUSTERED 
(
	[LMNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MMB_mas_RDLedger]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MMB_mas_RDLedger](
	[MNO] [nvarchar](50) NOT NULL,
	[RDNo] [nvarchar](50) NOT NULL,
	[RTNo] [nvarchar](50) NOT NULL,
	[Date] [smalldatetime] NOT NULL,
	[PRI] [int] NULL,
	[INT] [int] NULL,
	[BAL] [int] NULL,
 CONSTRAINT [PK_MMB_mas_RDLedger] PRIMARY KEY CLUSTERED 
(
	[MNO] ASC,
	[RDNo] ASC,
	[RTNo] ASC,
	[Date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MMB_mas_RecurringDeposit]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MMB_mas_RecurringDeposit](
	[MNo] [char](7) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[NName] [nvarchar](50) NULL,
	[Address] [nvarchar](255) NULL,
	[RDAmt] [nvarchar](50) NULL,
	[ROI] [float] NULL,
	[Period] [int] NULL,
	[C_Date] [smalldatetime] NULL,
	[MobileNo] [nvarchar](10) NULL,
	[SDate] [smalldatetime] NULL,
	[EDate] [smalldatetime] NULL,
	[Live] [nvarchar](1) NULL,
	[ACNo] [nvarchar](50) NULL,
	[RDNo] [int] NOT NULL,
	[RDACC] [float] NULL,
	[RDINT] [float] NULL,
 CONSTRAINT [PK_MMB_mas_RecurringDeposit] PRIMARY KEY CLUSTERED 
(
	[MNo] ASC,
	[RDNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[mmb_mas_share]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mmb_mas_share](
	[fdNo] [int] IDENTITY(1,1) NOT NULL,
	[fdMNo] [nvarchar](7) NULL,
	[fdName] [nvarchar](255) NULL,
	[fdNominee] [nvarchar](255) NULL,
	[fdAddress] [nvarchar](255) NULL,
	[fdMobile] [float] NULL,
	[fdDt] [datetime] NULL,
	[fdAmt] [int] NULL,
	[fdROI] [float] NULL,
	[fdDays] [int] NULL,
	[dbRtNo] [int] NULL,
	[dbTransID] [nvarchar](100) NULL,
	[fdStatus] [nvarchar](1) NULL,
	[fdLICDt] [smalldatetime] NULL,
	[fdACNo] [nvarchar](255) NULL,
	[fdACName] [nvarchar](255) NULL,
	[fdRemarks] [nvarchar](255) NULL,
	[MOP] [nvarchar](100) NULL,
	[FDCal] [nvarchar](1) NULL,
	[FDmethod] [nvarchar](100) NULL,
	[FDCategory] [int] NULL,
	[FdNomineeaadhar] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MMB_RTGS]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MMB_RTGS](
	[RTGSDt] [smalldatetime] NULL,
	[EDPNo] [nvarchar](20) NULL,
	[Name] [nvarchar](100) NULL,
	[ACNo] [nvarchar](50) NULL,
	[IFSC] [nvarchar](30) NULL,
	[RTGSAmt] [int] NULL,
	[RTGSBank] [nvarchar](50) NULL,
	[RTGSStatus] [char](1) NULL CONSTRAINT [DF_RTGS_RTGSStatus]  DEFAULT ('N'),
	[RTGSChqNo] [nvarchar](50) NULL,
	[Purpose] [nvarchar](50) NULL,
	[RefNo] [nvarchar](50) NULL,
	[BN] [nvarchar](255) NULL,
	[Remarks] [nvarchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MMB_Users]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MMB_Users](
	[UsrID] [nvarchar](7) NOT NULL,
	[UsrName] [nvarchar](25) NOT NULL,
	[FName] [nvarchar](50) NULL,
	[Desig] [nvarchar](50) NULL,
	[DOB] [smalldatetime] NULL,
	[DOJ] [smalldatetime] NULL,
	[DOC] [smalldatetime] NULL,
	[Address] [nvarchar](255) NULL,
	[PFBal] [float] NULL,
	[ACNo] [nvarchar](50) NULL,
	[Basic] [float] NULL,
	[DAP] [float] NULL,
	[HRAP] [float] NULL,
	[CCA] [float] NULL,
	[PFP] [float] NULL,
	[Allow1] [float] NULL,
	[Allow2] [float] NULL,
	[EHBLDt] [datetime] NULL,
	[EHBLAmt] [float] NULL,
	[EHBLBal] [float] NULL,
	[EHBLDem] [float] NULL,
	[EHBLInt] [int] NULL,
	[EHBLRI] [float] NULL,
	[FADt] [datetime] NULL,
	[FAAmt] [float] NULL,
	[FABal] [float] NULL,
	[FADem] [float] NULL,
	[EADt] [datetime] NULL,
	[EAAmt] [float] NULL,
	[EABal] [float] NULL,
	[EADem] [float] NULL,
	[EAInt] [float] NULL,
	[EARI] [float] NULL,
	[SLDt] [datetime] NULL,
	[SLAmt] [float] NULL,
	[SLBal] [float] NULL,
	[SLDem] [float] NULL,
	[SLInt] [int] NULL,
	[SLRI] [float] NULL,
	[SSLDt] [datetime] NULL,
	[SSLAmt] [float] NULL,
	[SSLBal] [float] NULL,
	[SSLDem] [float] NULL,
	[SSLInt] [int] NULL,
	[SSLRI] [float] NULL,
	[SSDep] [float] NULL,
	[PLDt] [smalldatetime] NULL,
	[PLAmt] [float] NULL,
	[PLBal] [float] NULL,
	[PLDem] [float] NULL,
	[PLInt] [int] NULL,
	[PLRI] [float] NULL,
	[SRD] [float] NULL,
	[LstIntDt] [datetime] NULL,
	[UsrPwd] [nvarchar](10) NOT NULL,
	[Nominee] [nvarchar](100) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UsrID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MOTHERS]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MOTHERS](
	[SNO] [int] NULL,
	[MMNO] [nvarchar](50) NULL,
	[MNAME] [nvarchar](50) NULL,
	[MMOBILE] [nvarchar](50) NULL,
	[MADDRESS] [nvarchar](500) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[NOOD]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NOOD](
	[MName] [nvarchar](100) NULL,
	[MAddress] [nvarchar](255) NULL,
	[MMobileNo] [float] NULL,
	[MMNo] [nvarchar](7) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[NOODINV]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NOODINV](
	[mname] [nvarchar](107) NULL,
	[MAddress] [nvarchar](255) NULL,
	[mmobile] [float] NULL,
	[mno] [nvarchar](7) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[NOODINVLAST]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[NOODINVLAST](
	[dmno] [char](7) NULL,
	[mname] [nvarchar](107) NULL,
	[MAddress] [nvarchar](255) NULL,
	[mmobile] [float] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[oldroifd]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[oldroifd](
	[fdno] [int] NULL,
	[fdroi] [float] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[output]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[output](
	[dbtrandt] [smalldatetime] NOT NULL,
	[dbedpno] [nvarchar](20) NOT NULL,
	[dbparticular] [nvarchar](300) NOT NULL,
	[roi] [float] NULL,
	[dbamt] [float] NULL,
	[dbchqno] [nvarchar](500) NULL,
	[dbhead] [nvarchar](75) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Pay_mas_Employee]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Pay_mas_Employee](
	[Comp_code] [varchar](4) NULL,
	[Emp_No] [varchar](20) NULL,
	[Emp_Name] [varchar](50) NULL,
	[Valid_From] [date] NULL,
	[Valid_To] [date] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PerLedgerML]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PerLedgerML](
	[plTranDt] [smalldatetime] NULL,
	[plMLI] [float] NULL CONSTRAINT [DF_PerLedgerML_plMLI]  DEFAULT ((0)),
	[plMPLI] [float] NULL CONSTRAINT [DF_PerLedgerML_plMLI1]  DEFAULT ((0)),
	[plMLP] [float] NULL CONSTRAINT [DF_PerLedgerML_plMLP]  DEFAULT ((0)),
	[plMLB] [float] NULL CONSTRAINT [DF_PerLedgerML_plMLB]  DEFAULT ((0)),
	[plPayRec] [nvarchar](1) NULL,
	[plTranID] [varchar](10) NULL,
	[SNo] [int] NULL CONSTRAINT [DF_PerLedgerML_SNo]  DEFAULT ((0))
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[printinactive]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[printinactive](
	[MNo] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Mobile_No] [varchar](12) NULL,
	[addresss] [varchar](8000) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ProjectLive]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectLive](
	[Project] [nvarchar](50) NULL,
	[Live] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RD]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RD](
	[dbTranDt] [smalldatetime] NOT NULL,
	[dbEDPNo] [nvarchar](20) NOT NULL,
	[dbParticular] [nvarchar](300) NOT NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](10) NOT NULL,
	[dbChqNo] [nvarchar](500) NOT NULL,
	[dbPayRec] [nvarchar](7) NOT NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](75) NOT NULL,
	[dbRtNo] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[rtnogn]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rtnogn](
	[ddate] [smalldatetime] NULL,
	[rtno] [int] NULL,
	[vorr] [nvarchar](1) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[rtnognold]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rtnognold](
	[ddate] [smalldatetime] NULL,
	[rtno] [int] NULL,
	[vorr] [nvarchar](1) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sdet]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sdet](
	[SName] [varchar](50) NULL,
	[Grade] [varchar](50) NULL,
	[Saddress] [nvarchar](max) NULL,
	[FName] [varchar](50) NULL,
	[FMob] [varchar](50) NULL,
	[MName] [varchar](50) NULL,
	[MMob] [varchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Serial_no]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Serial_no](
	[BondNo] [int] NULL,
	[SerialNo] [nvarchar](50) NULL,
	[Sdate] [smalldatetime] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SMSTABLE]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SMSTABLE](
	[MNO] [int] NULL,
	[FDNO] [int] NULL,
	[Sms] [char](1) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Systemuserlogg]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Systemuserlogg](
	[LDate] [smalldatetime] NULL,
	[LUsername] [nvarchar](50) NULL,
	[LIPADD] [nvarchar](50) NULL,
	[LLocation] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[temp##]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[temp##](
	[chk] [bit] NULL,
	[Name] [nvarchar](255) NULL,
	[fdMno] [nvarchar](7) NULL,
	[FDNo] [int] IDENTITY(1,1) NOT NULL,
	[Date] [nvarchar](10) NULL,
	[Amount] [int] NULL,
	[ROI] [float] NULL,
	[LICdt] [nvarchar](10) NULL,
	[FDI] [numeric](20, 0) NULL,
	[BankACNo] [nvarchar](20) NULL,
	[ifsc] [nvarchar](255) NULL,
	[fdAcNo] [nvarchar](255) NULL,
	[descr] [nvarchar](55) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[temp3#]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[temp3#](
	[dbTranDt] [smalldatetime] NOT NULL,
	[dbEDPNo] [nvarchar](20) NOT NULL,
	[dbParticular] [nvarchar](300) NOT NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](10) NOT NULL,
	[dbChqNo] [nvarchar](500) NOT NULL,
	[dbPayRec] [nvarchar](7) NOT NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](75) NOT NULL,
	[dbRtNo] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[temp4#]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[temp4#](
	[dbTranDt] [smalldatetime] NOT NULL,
	[dbEDPNo] [nvarchar](20) NOT NULL,
	[dbParticular] [nvarchar](300) NOT NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](10) NOT NULL,
	[dbChqNo] [nvarchar](500) NOT NULL,
	[dbPayRec] [nvarchar](7) NOT NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](75) NOT NULL,
	[dbRtNo] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TempFD]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TempFD](
	[dbtrandt] [smalldatetime] NULL,
	[DBEDPNO] [int] NULL,
	[FDNO] [varchar](250) NOT NULL,
	[AMOUNT] [int] NULL,
	[DBCHQNO] [varchar](250) NULL,
	[RVNO] [int] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tempfdd]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tempfdd](
	[fdNo] [int] IDENTITY(1,1) NOT NULL,
	[fdMNo] [nvarchar](7) NULL,
	[fdName] [nvarchar](255) NULL,
	[fdNominee] [nvarchar](255) NULL,
	[fdAddress] [nvarchar](255) NULL,
	[fdMobile] [float] NULL,
	[fdDt] [datetime] NULL,
	[fdAmt] [int] NULL,
	[fdROI] [float] NULL,
	[fdDays] [int] NULL,
	[dbRtNo] [int] NULL,
	[dbTransID] [nvarchar](100) NULL,
	[fdStatus] [nvarchar](1) NULL,
	[fdLICDt] [smalldatetime] NULL,
	[fdACNo] [nvarchar](255) NULL,
	[fdACName] [nvarchar](255) NULL,
	[fdRemarks] [nvarchar](255) NULL,
	[MOP] [nvarchar](100) NULL,
	[FDCal] [nvarchar](1) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Terms]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Terms](
	[TMNO] [int] NULL,
	[TDATE] [smalldatetime] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tmpFerdeen1]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tmpFerdeen1](
	[dbTranDt] [smalldatetime] NOT NULL,
	[dbEDPNo] [nvarchar](20) NOT NULL,
	[dbParticular] [nvarchar](300) NOT NULL,
	[dbAmt] [float] NULL,
	[dbModeOfPay] [nvarchar](10) NOT NULL,
	[dbChqNo] [nvarchar](500) NOT NULL,
	[dbPayRec] [nvarchar](7) NOT NULL,
	[dbRemarks] [nvarchar](50) NULL,
	[dbHead] [nvarchar](75) NOT NULL,
	[dbRtNo] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  View [dbo].[AMLSql]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE View [dbo].[AMLSql] As Select * from MMB_DayBook  Where dbEDPNo='43069' and  dbTranDt>'Mar 17 2021 12:00AM' and dbHead in ('House Mortgage Loan','House Mortgage Loan Interest','Penal Interest') and dbparticular like '%HML0010%' 
GO
/****** Object:  View [dbo].[sbd]    Script Date: 11-Dec-25 12:05:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create view [dbo].[sbd] as select dbedpno +'  '+(select MName from [MemberA].[dbo].MemberDetails where MMNo=a.dbedpno ) collate Database_default Subhead,cast( dbamt as nvarchar) collate Database_default Cash,dbhead collate Database_default AccountHead,cast(dbrvno as nvarchar) collate Database_default Adj from [MemberA].[dbo].DayBook a where dbTranDt='" + Convert.ToDateTime(txtfrm.Text).ToString("yyyy-MM-dd") + "' and dbModeOfPay='Cash'and dbEDPNo not like '%B-%' and dbRemarks like '%rec%'  union select 'B-'+dbedpno +'  '+(select name from [TTCECSTEST].dbo.MMB_mas_Members where MNo=b.dbedpno ) collate Database_default,cast( dbamt as nvarchar) collate Database_default,dbhead collate Database_default,cast( dbrtno as nvarchar) collate Database_default from [TTCECSTEST].dbo.MMB_Daybook b where dbTranDt='" + Convert.ToDateTime(txtfrm.Text).ToString("yyyy-MM-dd") + "' and dbModeOfPay='Cash' and dbRemarks like '%rec%' 
GO
USE [master]
GO
ALTER DATABASE [TTCECSTEST] SET  READ_WRITE 
GO
