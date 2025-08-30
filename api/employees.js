import express from "express";
const router = express.Router();
export default router;

import { getEmployees } from "#db/queries/employees";

// TODO: this file!
router.route("/").get(async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});
