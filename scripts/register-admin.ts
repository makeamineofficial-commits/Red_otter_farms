import { db } from "../src/lib/db";
import bcrypt from "bcrypt";

const getArg = (key: string): string | undefined => {
  const arg = process.argv.find((a) => a.startsWith(`--${key}=`));
  return arg?.split("=")[1];
};

const registerAdmin = async () => {
  const email = getArg("email");
  const password = getArg("password");

  if (!email || !password) {
    console.error(
      "Missing required args. Usage:\n" +
        "bun run ./scripts/register-admin.ts --email=admin@gmail.com --password=12345678"
    );
    process.exit(1);
  }
  try {
    const check = await db.adminUser.findUnique({
      where: {
        email,
      },
    });

    if (check) {
      console.warn(
        "[REGISTER ADMIN] Admin user with this email already registered"
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.adminUser.create({
      data: {
        email,
        passwordHash,
      },
    });

    console.info("[REGISTER ADMIN] Admin user created successfully");
  } catch (err) {
    console.error("[REGISTER ADMIN] Failed to create new admin user");
  }
};
registerAdmin();

// bun run ./scripts/register-admin.ts --email=admin@gmail.com --password=12345678
