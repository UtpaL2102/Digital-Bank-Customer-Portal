
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.BranchScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  address: 'address',
  created_at: 'created_at'
};

exports.Prisma.EmployeeScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  branch_id: 'branch_id',
  position: 'position'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  account_number: 'account_number',
  account_type: 'account_type',
  status: 'status',
  balance: 'balance',
  daily_limit: 'daily_limit',
  monthly_limit: 'monthly_limit',
  user_id: 'user_id',
  branch_id: 'branch_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  closed_at: 'closed_at'
};

exports.Prisma.BeneficiaryScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  name: 'name',
  bank_name: 'bank_name',
  account_number: 'account_number',
  ifsc_swift: 'ifsc_swift',
  currency: 'currency',
  is_active: 'is_active',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  amount: 'amount',
  status: 'status',
  type: 'type',
  description: 'description',
  idempotency_key: 'idempotency_key',
  from_account_id: 'from_account_id',
  to_account_id: 'to_account_id',
  to_beneficiary_id: 'to_beneficiary_id',
  initiated_by: 'initiated_by'
};

exports.Prisma.StatementScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  account_id: 'account_id',
  date_from: 'date_from',
  date_to: 'date_to',
  format: 'format',
  delivery: 'delivery',
  file_url: 'file_url',
  status: 'status',
  created_at: 'created_at'
};

exports.Prisma.ScheduledTransferScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  from_account_id: 'from_account_id',
  to_account_id: 'to_account_id',
  to_beneficiary_id: 'to_beneficiary_id',
  amount: 'amount',
  description: 'description',
  frequency: 'frequency',
  next_run_at: 'next_run_at',
  end_date: 'end_date',
  occurrences_left: 'occurrences_left',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.DisputeScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  transaction_id: 'transaction_id',
  reason: 'reason',
  description: 'description',
  status: 'status',
  created_at: 'created_at',
  resolved_at: 'resolved_at',
  resolution_note: 'resolution_note'
};

exports.Prisma.DisputeAttachmentScalarFieldEnum = {
  id: 'id',
  dispute_id: 'dispute_id',
  file_url: 'file_url',
  file_hash: 'file_hash',
  created_at: 'created_at'
};

exports.Prisma.LimitRequestScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  account_id: 'account_id',
  current_daily_limit: 'current_daily_limit',
  current_monthly_limit: 'current_monthly_limit',
  requested_daily_limit: 'requested_daily_limit',
  requested_monthly_limit: 'requested_monthly_limit',
  reason: 'reason',
  status: 'status',
  created_at: 'created_at',
  decided_at: 'decided_at',
  reviewer_employee_id: 'reviewer_employee_id',
  decision_note: 'decision_note'
};

exports.Prisma.LimitRequestEventScalarFieldEnum = {
  id: 'id',
  limit_request_id: 'limit_request_id',
  action: 'action',
  actor_user_id: 'actor_user_id',
  actor_employee_id: 'actor_employee_id',
  note: 'note',
  created_at: 'created_at'
};

exports.Prisma.LoanScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  account_id: 'account_id',
  branch_id: 'branch_id',
  amount: 'amount',
  interest_rate: 'interest_rate',
  start_date: 'start_date',
  end_date: 'end_date',
  status: 'status',
  created_at: 'created_at'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  type: 'type',
  message: 'message',
  status: 'status',
  sent_at: 'sent_at'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  action: 'action',
  details: 'details',
  performed_at: 'performed_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Branch: 'Branch',
  Employee: 'Employee',
  Account: 'Account',
  Beneficiary: 'Beneficiary',
  Transaction: 'Transaction',
  Statement: 'Statement',
  ScheduledTransfer: 'ScheduledTransfer',
  Dispute: 'Dispute',
  DisputeAttachment: 'DisputeAttachment',
  LimitRequest: 'LimitRequest',
  LimitRequestEvent: 'LimitRequestEvent',
  Loan: 'Loan',
  Notification: 'Notification',
  AuditLog: 'AuditLog'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
