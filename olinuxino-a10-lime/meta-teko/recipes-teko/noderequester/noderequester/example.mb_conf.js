TECO-CONTROL-SYSTEM-MIB DEFINITIONS ::= BEGIN

IMPORTS
	NOTIFICATION-TYPE, OBJECT-TYPE, MODULE-IDENTITY, 
	enterprises, Integer32, Unsigned32 FROM SNMPv2-SMI
	TEXTUAL-CONVENTION                 FROM SNMPv2-TC;

teco MODULE-IDENTITY
	LAST-UPDATED "200811010000Z"
	ORGANIZATION 
		"TECO Ltd"
	CONTACT-INFO 
		"tav@teco.com.ua"
	DESCRIPTION 
		"TECO monitoring units"
::= { enterprises 47480 }

ctlRdOnlyValues      OBJECT IDENTIFIER ::= { teco 1 }
ctlRdWrValues        OBJECT IDENTIFIER ::= { teco 2 }
conditionerValues    OBJECT IDENTIFIER ::= { teco 3 }
conditionerOutputs   OBJECT IDENTIFIER ::= { teco 4 }
huaweiValues         OBJECT IDENTIFIER ::= { teco 5 }

Themperature ::= TEXTUAL-CONVENTION
    DISPLAY-HINT "d-3"
    STATUS       current
    DESCRIPTION
            "Displays float with 1 digit after point."
    SYNTAX       Integer32

ctlUnitModuleId  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Id of module"
	::= { ctlRdOnlyValues 1 }

ctlUnitModuleTemperature1  OBJECT-TYPE
	SYNTAX     Themperature
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"ADC1 input value"
	::= { ctlRdOnlyValues 2 }
	
ctlUnitModuleTemperature2  OBJECT-TYPE
	SYNTAX     Themperature
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Temperature of module"
	::= { ctlRdOnlyValues 3 }
	
ctlUnitModuleTemperature3  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"ADC1 input value"
	::= { ctlRdOnlyValues 4 }
	
ctlUnitModuleTemperature4  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"ADC2 input value"
	::= { ctlRdOnlyValues 5 }
	
ctlUnitModuleDigitalInputs  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Digital inputs value"
	::= { ctlRdOnlyValues 6 }

ctlUnitModuleDryContacts  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Dry contacts value"
	::= { ctlRdOnlyValues 7 }
	
	
ctlUnitDryContactsOutput  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"Values of output dry contacts"
	::= { ctlRdWrValues 1 }
	
ctlUnitPowerContactsOutput  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"Values of output power contacts"
	::= { ctlRdWrValues 2 }

state  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Conditioner state"
	::= { conditionerValues 1 }

fails  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Conditioner failes"
	::= { conditionerValues 2 }

temp3  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Conditioner temp3"
	::= { conditionerValues 3 }

temp1  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Conditioner temp1"
	::= { conditionerValues 4 }

temp7  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Conditioner temp7"
	::= { conditionerValues 5 }

temp8  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Conditioner temp8"
	::= { conditionerValues 6 }

temp4  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Conditioner temp4"
	::= { conditionerValues 7 }

temp6  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Conditioner temp6"
	::= { conditionerValues 8 }

temp5  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Conditioner temp5"
	::= { conditionerValues 9 }

temp2  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"Conditioner temp1"
	::= { conditionerValues 10 }

conditioner_int_temp_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_int_temp_ref"
	::= { conditionerOutputs 1 }
	
conditioner_dt_comp  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_dt_comp"
	::= { conditionerOutputs 2 }
	
conditioner_ta1_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_dt_comp"
	::= { conditionerOutputs 3 }
	
conditioner_fail_t_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_fail_t_ref"
	::= { conditionerOutputs 4 }
	
conditioner_th1_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_th1_ref"
	::= { conditionerOutputs 5 }

conditioner_th2_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_th2_ref"
	::= { conditionerOutputs 6 }
	
conditioner_t7_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_t7_ref"
	::= { conditionerOutputs 7 }
	
conditioner_dt_hlad_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_dt_hlad_ref"
	::= { conditionerOutputs 8 }

conditioner_p_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_p_ref"
	::= { conditionerOutputs 9 }

conditioner_pp_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_pp_ref"
	::= { conditionerOutputs 10 }

conditioner_m_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_m_ref"
	::= { conditionerOutputs 11 }

conditioner_mm_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_mm_ref"
	::= { conditionerOutputs 12 }
	
conditioner_p_cond_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_p_cond_ref"
	::= { conditionerOutputs 13 }
	
conditioner_pp_cond_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_pp_cond_ref"
	::= { conditionerOutputs 14 }

conditioner_m_cond_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_m_cond_ref"
	::= { conditionerOutputs 15 }
	
conditioner_freecool_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_freecool_ref"
	::= { conditionerOutputs 16 }
	
conditioner_fan_speed_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_fan_speed_ref"
	::= { conditionerOutputs 17 }
	
conditioner_fan2_speed_ref  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"conditionerOutputs conditioner_fan2_speed_ref"
	::= { conditionerOutputs 18 }
	
hwRectsRatedVoltage  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"hwRectsRatedVoltage"
	::= { huaweiValues 1 }

hwRectsTotalCurrent  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-only
	STATUS     current
	DESCRIPTION 
		"hwRectsTotalCurrent"
	::= { huaweiValues 2 }

hwSetBattsHighTempAction  OBJECT-TYPE
	SYNTAX     Integer32
	MAX-ACCESS read-write
	STATUS     current
	DESCRIPTION 
		"hwSetBattsHighTempAction"
	::= { huaweiValues 3 }



END
